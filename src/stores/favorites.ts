import { observable } from "@legendapp/state"
import type { Post } from "~/schemas/post"
import type { User } from "~/schemas/user"
import { getFavoritesPage } from "~/actions/e621"
import { pageLimit } from "~/actions/e621-config"

type FavoritesState = {
    data: Post[]
    error: string
    loading: boolean
    progress: {
        current: number
        total: number
    }
}

type FavoritesActions = {
    fetchFavorites: (user: User) => Promise<void>
}

type FavoritesStore = {
    actions: FavoritesActions
    state: FavoritesState
}

const defaultState: FavoritesState = {
    data: [],
    error: "",
    loading: false,
    progress: {
        current: 0,
        total: 0,
    },
}

export const $favorites = observable<FavoritesStore>({
    actions: {
        fetchFavorites: async (user) => {
            $favorites.state.set({
                ...defaultState,
                loading: true,
            })

            const numberOfPages = Math.ceil(user.favorite_count / pageLimit)

            $favorites.state.set({
                ...defaultState,
                loading: true,
                progress: {
                    current: 1,
                    total: numberOfPages,
                },
            })

            const requests = Array.from(
                { length: numberOfPages }, // create an array of length `pages`
                (_, index) => index + 1, // fill it with numbers from 1 to `pages`
            ).map(async (page) => {
                const posts = await getFavoritesPage(user.id, page)
                $favorites.state.set({
                    ...defaultState,
                    loading: true,
                    progress: {
                        current: $favorites.state.get().progress.current + 1,
                        total: numberOfPages,
                    },
                })
                return posts
            })

            const results = await Promise.allSettled(requests)
            const favorites = results.flatMap((result) => result.status === "fulfilled" ? result.value : [])

            const update = favorites.length === 0
                ? {
                    ...defaultState,
                    error: "No favorites found.",
                }
                : {
                    ...defaultState,
                    data: favorites,
                }

            $favorites.state.set(update)
        },
    },
    state: defaultState,
})
