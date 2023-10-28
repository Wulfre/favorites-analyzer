import { signal } from "@preact/signals"
import { object, array, parse } from "valibot"
import { $toaster } from "~/components/Toaster"
import { clientString, pageLimit } from "~/utils/constants"
import { userSchema } from "~/schemas/user"
import type { User } from "~/schemas/user"
import { postSchema } from "~/schemas/post"
import type { Post } from "~/schemas/post"
import pThrottle from "p-throttle"

const e6Throttle = pThrottle({
    limit: 2,
    interval: 1000,
})

const getUser = e6Throttle(async (username: string): Promise<User | undefined> => {
    console.log("getting user")
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
    console.log("getting favorites page")
    const response = await fetch(`https://e621.net/favorites.json?_client=${clientString}&user_id=${userId}&limit=${pageLimit}&page=${page}`, { cache: "no-cache" })

    if (!response.ok) {
        return []
    }

    const { posts } = parse(favoritesResponseSchema, await response.json())
    return posts
})

const getFavorites = async (user: User): Promise<Post[]> => {
    const numberOfPages = Math.ceil(user.favorite_count / pageLimit)

    const requests = Array.from({ length: numberOfPages }, (_, index) => index + 1)
        .map(async (page) => await getFavoritesPage(user.id, page))

    const results = await Promise.allSettled(requests)
    const favorites = results.flatMap((result) => result.status === "fulfilled" ? result.value : [])

    if(favorites.length === 0) {
        $toaster.actions.addToast({
            type: "warning",
            header: "Favorites Warning",
            message: "No favorites found. This user may have no favorites, or their favorites may be private.",
        })
    }

    return favorites
}

export const $user = {
    state: {
        user: signal<User | undefined>(undefined),
        favorites: signal<Post[]>([]),
        loading: signal(false),
    },
    actions: {
        fetch: async (username: string) => {
            $user.state.loading.value = true
            $user.state.user.value = await getUser(username)

            if ($user.state.user.value !== undefined) {
                $user.state.favorites.value = await getFavorites($user.state.user.value)
            }

            $user.state.loading.value = false
        },
    },
}
