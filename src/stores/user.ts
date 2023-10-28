import { signal, computed } from "@preact/signals"
import { object, array, parse } from "valibot"
import pThrottle from "p-throttle"
import { $toaster } from "~/components/Toaster"
import { clientString, pageLimit } from "~/utils/constants"
import { userSchema } from "~/schemas/user"
import type { User } from "~/schemas/user"
import { postSchema } from "~/schemas/post"
import type { Post } from "~/schemas/post"

const e6Throttle = pThrottle({
    limit: 2,
    interval: 1000,
})

const getUser = e6Throttle(async (username: string): Promise<User | undefined> => {
    const response = await fetch(`https://e621.net/users/${encodeURIComponent(username)}.json?_client=${clientString}`)

    if (!response.ok) {
        $toaster.actions.addToast({
            header: "User Error",
            message: `Failed to fetch user "${username}".`,
            type: "error",
        })
        return undefined
    }

    return parse(userSchema, await response.json())
})

const favoritesResponseSchema = object({
    posts: array(postSchema),
})

const getFavoritesPage = e6Throttle(async (userId: number, page: number): Promise<Post[]> => {
    const response = await fetch(`https://e621.net/favorites.json?_client=${clientString}&user_id=${userId}&limit=${pageLimit}&page=${page}`)

    $user.state.status.favorites.currentPage.value += 1

    if (!response.ok) {
        return []
    }

    const { posts } = parse(favoritesResponseSchema, await response.json())
    return posts
})

const getFavorites = async (user: User): Promise<Post[]> => {
    const numberOfPages = Math.ceil(user.favorite_count / pageLimit)
    $user.state.status.favorites.totalPages.value = numberOfPages

    const requests = Array.from({ length: numberOfPages }, (_, index) => index + 1)
        .map((page) => getFavoritesPage(user.id, page))

    const results = await Promise.allSettled(requests)
    const favorites = results.flatMap((result) => result.status === "fulfilled" ? result.value : [])

    if (favorites.length === 0) {
        $toaster.actions.addToast({
            type: "warning",
            header: "Favorites Warning",
            message: "No favorites found. This user may have no favorites, or their favorites may be private.",
        })
    }

    return favorites
}

export const getPostsTagScores = (posts: Post[]): Map<string, number> => {
    const tagScores = new Map<string, number>()

    for (const post of posts) {
        for (const tags of Object.values(post.tags)) {
            for (const tag of tags) {
                const count = tagScores.get(tag) ?? 0
                tagScores.set(tag, count + 1)
            }
        }
    }

    return tagScores
}

export const $user = {
    state: {
        user: signal<User | undefined>(undefined),
        favorites: {
            posts: signal<Post[]>([]),
            tagScores: computed((): [string, number][] => [...getPostsTagScores($user.state.favorites.posts.value).entries()].sort(([, a], [, b]) => b - a)),
        },
        status: {
            loading: computed((): boolean => $user.state.status.user.loading.value || $user.state.status.favorites.loading.value),
            user: {
                loading: signal(false),
            },
            favorites: {
                loading: signal(false),
                currentPage: signal(0),
                totalPages: signal(0),
            },
        },
    },
    actions: {
        fetch: async (username: string) => {
            $user.state.status.user.loading.value = true
            $user.state.user.value = await getUser(username)
            $user.state.status.user.loading.value = false

            if ($user.state.user.value !== undefined) {
                $user.state.status.favorites.loading.value = true
                $user.state.favorites.posts.value = await getFavorites($user.state.user.value)
                $user.state.status.favorites.loading.value = false
            }
        },
    },
}
