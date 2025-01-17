import { z } from "astro:schema"
import { DOMParser, HTMLElement } from "linkedom/worker"
import { cluster } from "radashi"

const baseUrl = "https://e621.net"
const userAgent = "favorites-analyzer/20250113 (by wulfre)"

const userResponseSchema = z.object({
    favorite_count: z.number(),
    id: z.number(),
})

export const getUser = async (username: string) => {
    const userResponse = await fetch(`${baseUrl}/users/${username}.json`, {
        headers: { "User-Agent": userAgent },
    })

    if (!userResponse.ok) {
        throw new Error(`failed to fetch user "${username}"`)
    }

    const userData = await userResponse.json()
    const user = userResponseSchema.parse(userData)

    return user
}

const postsResponseSchema = z.object({
    posts: z.array(
        z.object({
            id: z.number(),
            file: z.object({
                width: z.number(),
                height: z.number(),
                ext: z.string(),
                md5: z.string(),
            }),
            tags: z.object({
                general: z.array(z.string()),
                artist: z.array(z.string()),
                contributor: z.array(z.string()),
                copyright: z.array(z.string()),
                character: z.array(z.string()),
                species: z.array(z.string()),
                invalid: z.array(z.string()),
                meta: z.array(z.string()),
                lore: z.array(z.string()),
            }),
            rating: z.string(),
            score: z.object({
                up: z.number(),
                down: z.number(),
                total: z.number(),
            }),
            fav_count: z.number(),
        }),
    ),
})
type Post = z.infer<typeof postsResponseSchema>["posts"][0]

export const getUserFavorites = async (userId: number) => {
    const favoritesResponse = await fetch(`${baseUrl}/favorites.json?limit=320&user_id=${userId}`, {
        headers: { "User-Agent": userAgent },
    })

    if (!favoritesResponse.ok) {
        throw new Error("failed to fetch favorites")
    }

    const favoritesData = await favoritesResponse.json()
    const favorites = postsResponseSchema.parse(favoritesData)

    return favorites
}

export const getPosts = async (tags: string[] = [], limit = 320) => {
    const postsResponse = await fetch(
        `${baseUrl}/posts.json?limit=${limit}&tags=${tags.join(" ")}`,
        {
            headers: { "User-Agent": userAgent },
        },
    )

    if (!postsResponse.ok) {
        throw new Error("failed to fetch posts")
    }

    const postsData = await postsResponse.json()
    const posts = postsResponseSchema.parse(postsData)

    return posts
}

const tagsResponseSchema = z.array(
    z.object({
        id: z.number(),
        name: z.string(),
        post_count: z.number(),
        related_tags: z.string(),
    }),
)

const getTags = async (names: string[] = [], limit = 320) => {
    const nameChunks = cluster(names, limit)

    const requestPromises = nameChunks.map(async (chunk) => {
        const tagsResponse = await fetch(
            `${baseUrl}/tags.json?limit=${limit}&search[name]=${chunk.join(",")}`,
            {
                headers: { "User-Agent": userAgent },
            },
        )

        if (!tagsResponse.ok) {
            throw new Error("failed to fetch tags")
        }

        const tagsData = await tagsResponse.json()
        const tags = tagsResponseSchema.parse(tagsData)

        return tags.map((tag) => ({
            ...tag,
            related_tags: tag.related_tags.split(" ").reduce(
                (acc, _val, i, arr) => {
                    if (i % 2 !== 0) {
                        return acc
                    }

                    const name = arr[i]
                    const stringConfidence = arr[i + 1]

                    if (!name || !stringConfidence) {
                        return acc
                    }

                    acc.push({
                        name,
                        confidence: Number.parseFloat(stringConfidence) / 300,
                    })

                    return acc
                },
                [] as { name: string; confidence: number }[],
            ),
        }))
    })

    return (await Promise.all(requestPromises)).flat()
}
type Tag = Awaited<ReturnType<typeof getTags>>[0]

export const getTotalPostsCount = async () => {
    const homeResponse = await fetch(`${baseUrl}/`, {
        headers: { "User-Agent": userAgent },
    })

    const homeData = await homeResponse.text()
    const homeDocument = new DOMParser().parseFromString(homeData, "text/html")

    const statsElement = homeDocument.querySelector("#searchbox3 p")
    const totalPostsString =
        (statsElement instanceof HTMLElement &&
            statsElement?.textContent
                ?.match(/\d+(?:,\d+)*/)
                ?.at(0)
                ?.replace(/,/g, "")) ||
        "1"

    return Number.parseInt(totalPostsString)
}

interface TagScore {
    tag: string
    type: string
    frequency: number // Personal usage rate
    popularity: number // Global usage rate
    recency: number // Position-weighted score
    interest: number // Relative usage comparison
    totalScore: number // Combined score
}

export const scoreTags = async (postTags: Post["tags"][]): Promise<TagScore[]> => {
    const totalPostsCount = await getTotalPostsCount()
    console.log(totalPostsCount)
    const totalFavorites = postTags.length

    // Gather tag occurrences and positions
    const tagOccurrences = new Map<string, number>()
    const tagPositions = new Map<string, number[]>()
    const tagTypes = new Map<string, string>()

    for (const [index, tags] of postTags.entries()) {
        for (const [type, tagList] of Object.entries(tags)) {
            if (type === "invalid" || type === "meta") {
                continue
            }

            for (const tag of tagList) {
                tagOccurrences.set(tag, (tagOccurrences.get(tag) ?? 0) + 1)
                const positions = tagPositions.get(tag) ?? []
                positions.push(index)
                tagPositions.set(tag, positions)
                tagTypes.set(tag, type)
            }
        }
    }

    // Fetch tag data
    const tagsNames = Array.from(tagOccurrences.keys())
    const tagData = new Map<string, Tag>((await getTags(tagsNames)).map((tag) => [tag.name, tag]))

    // Calculate scores for each tag
    const scores: TagScore[] = []

    for (const [tag, count] of tagOccurrences) {
        const data = tagData.get(tag)

        const positions = tagPositions.get(tag) || []
        const avgPosition = positions.reduce((sum, pos) => sum + pos, 0) / positions.length

        const frequency = count / totalFavorites
        const popularity = (data?.post_count ?? 0) / totalPostsCount
        const recency = 1 - avgPosition / totalFavorites
        const interest =
            popularity === 0 ? 0 : 0.5 * (1 + Math.tanh(Math.log(frequency / popularity)))

        const score: TagScore = {
            tag,
            type: tagTypes.get(tag) ?? "general",
            frequency,
            popularity,
            recency,
            interest,
            totalScore: frequency - popularity + interest,
        }

        scores.push(score)
    }

    // Sort by total score descending
    return scores.sort((a, b) => b.totalScore - a.totalScore)
}
