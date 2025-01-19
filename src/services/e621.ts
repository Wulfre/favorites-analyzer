import { z } from "astro:schema"
import { DOMParser, HTMLElement } from "linkedom/worker"
import pThrottle from "p-throttle"
import { cluster } from "radashi"

const baseUrl = "https://e621.net"
const userAgent = "favorites-analyzer/20250113 (by wulfre)"

const throttledFetch = pThrottle({
    limit: 2,
    interval: 1000,
})(fetch)

const userResponseSchema = z.object({
    favorite_count: z.number(),
    id: z.number(),
})
type User = z.infer<typeof userResponseSchema>

export const getUser = async (username: string) => {
    const userResponse = await throttledFetch(`${baseUrl}/users/${username}.json`, {
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

export const getUserFavorites = async (user: User) => {
    const limit = 320
    const pages = Math.ceil(user.favorite_count / limit)

    const favoritesPromises = Array.from({ length: pages }, async (_, i) => {
        const favoritesResponse = await throttledFetch(
            `${baseUrl}/favorites.json?limit=320&user_id=${user.id}&page=${i + 1}`,
            {
                headers: { "User-Agent": userAgent },
            },
        )

        if (!favoritesResponse.ok) {
            return { posts: [] }
        }

        const favoritesData = await favoritesResponse.json()
        return postsResponseSchema.parse(favoritesData)
    })

    return (await Promise.all(favoritesPromises)).flatMap((favorites) => favorites.posts)
}

export const getPosts = async (tags: string[] = [], limit = 320) => {
    const postsResponse = await throttledFetch(
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
        const tagsResponse = await throttledFetch(
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
    type: string
    // frequency: number // Personal usage rate
    // popularity: number // Global usage rate
    // recency: number // Position-weighted score
    // interest: number // Relative usage comparison
    // totalScore: number // Combined score
}

export const scoreTags = async (postTags: Post["tags"][]) => {
    const tagMap = new Map<string, TagScore>()

    for (const tags of postTags) {
        // Omit "invalid" and "meta" tags
        const { invalid: _, meta: __, ...cleanTags } = tags

        for (const [type, names] of Object.entries(cleanTags)) {
            for (const name of names) {
                tagMap.set(name, { type })
            }
        }
    }

    return Array.from(tagMap).sort(([a], [b]) => a.localeCompare(b))
}
