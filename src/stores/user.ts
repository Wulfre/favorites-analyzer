import { observable } from "@legendapp/state"
import { $favorites } from "./favorites"
import type { User } from "~/schemas/user"
import { getUser } from "~/actions/e621/external"
import { $toaster } from "~/components/ui/Toaster"

type UserState = {
    data: User | undefined
    loading: boolean
}

type UserActions = {
    fetch: (username: string) => Promise<void>
}

type UserStore = {
    state: UserState
    actions: UserActions
}

const defaultState: UserState = {
    data: undefined,
    loading: false,
}

export const $user = observable<UserStore>({
    state: defaultState,
    actions: {
        fetch: async (username: string) => {
            $favorites.actions.reset()
            $user.state.set({ ...defaultState, loading: true })

            try {
                const user = await getUser(username)

                if (user === undefined) {
                    $user.state.set({ ...defaultState })
                    $toaster.createToast({
                        type: "error",
                        header: "User Error",
                        message: "User not found.",
                    })
                    return
                }

                $user.state.set({ ...defaultState, data: user })
            } catch (error) {
                $user.state.set({ ...defaultState })
                $toaster.createToast({
                    type: "error",
                    header: "User Error",
                    message: "An error occurred while fetching the user.",
                })
            }
        },
    },
})
