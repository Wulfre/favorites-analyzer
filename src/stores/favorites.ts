import { observable } from "@legendapp/state"
import type { Post } from "~/schemas/post"
import type { User } from "~/schemas/user"
import { getFavoritesPage } from "~/actions/e621/external"
import { pageLimit } from "~/actions/e621/config"
import { $toaster } from "~/components/ui/Toaster"

type FavoritesState = {
    data: Post[]
    loading: boolean
    progress: {
        current: number
        total: number
    }
}

type FavoritesActions = {
    fetch: (user: User) => Promise<void>
    reset: () => void
}

type FavoritesStore = {
    state: FavoritesState
    actions: FavoritesActions
}

const defaultState: FavoritesState = {
    data: [],
    loading: false,
    progress: {
        current: 0,
        total: 0,
    },
}

export const $favorites = observable<FavoritesStore>({
    state: defaultState,
    actions: {
        reset: () => { $favorites.state.set(defaultState) },
        fetch: async (user) => {
            $favorites.state.set({
                ...defaultState,
                loading: true,
            })

            try {
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
                    { length: numberOfPages },
                    (_, index) => index + 1,
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

                if (favorites.length === 0) {
                    $toaster.createToast({
                        type: "warning",
                        header: "No Favorites",
                        message: "No favorites found. This user may have no favorites, or their favorites may be private.",
                    })
                }

                $favorites.state.set({
                    ...defaultState,
                    data: favorites,
                })
            } catch (error) {
                $toaster.createToast({
                    type: "error",
                    header: "Favorites Error",
                    message: "An error occurred while fetching the user's favorites.",
                })
                $favorites.state.set({
                    ...defaultState,
                })
            }
        },
    },
})
