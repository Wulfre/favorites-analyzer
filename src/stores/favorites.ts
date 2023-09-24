import { observable } from "@legendapp/state"
import type { Post } from "~/schemas/post"
import type { User } from "~/schemas/user"
import { getFavorites } from "~/actions/e621"

type FavoritesState = {
    data: Post[]
    error: string
    loading: boolean
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
}

export const $favorites = observable<FavoritesStore>({
    actions: {
        fetchFavorites: async (user) => {
            $favorites.state.set({
                ...defaultState,
                loading: true,
            })

            const favorites = await getFavorites(user)

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
