import { observable } from "@legendapp/state"
import type { Post } from "~/schemas/post"
import { getFavorites } from "~/actions/e621"

type FavoritesState = {
    data: Post[]
    error: string
    loading: boolean
}

type FavoritesActions = {
    fetchFavorites: (userId: number) => Promise<void>
}

type FavoritesStore = {
    actions: FavoritesActions
    state: FavoritesState
}

export const $favorites = observable<FavoritesStore>({
    actions: {
        fetchFavorites: async (userId) => {
            $favorites.state.set({
                data: [],
                error: "",
                loading: true,
            })

            const favorites = await getFavorites(userId)

            const update = favorites === undefined
                ? {
                    data: [],
                    error: "No favorites found",
                    loading: false,
                }
                : {
                    data: favorites,
                    error: "",
                    loading: false,
                }

            $favorites.state.set(update)
        },
    },
    state: {
        data: [],
        error: "",
        loading: false,
    },
})
