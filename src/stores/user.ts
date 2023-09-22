import { observable } from "@legendapp/state"
import type { User } from "~/schemas/user"
import { getUser } from "~/actions/e621"

type UserState = {
    data: User | undefined
    error: string
    loading: boolean
}

type UserActions = {
    fetchUser: (username: string) => Promise<void>
}

type UserStore = {
    actions: UserActions
    state: UserState
}

export const $user = observable<UserStore>({
    actions: {
        fetchUser: async (username) => {
            $user.state.set({
                data: undefined,
                error: "",
                loading: true,
            })

            const user = await getUser(username)

            const update = user === undefined
                ? {
                    data: undefined,
                    error: "User not found",
                    loading: false,
                }
                : {
                    data: user,
                    error: "",
                    loading: false,
                }

            $user.state.set(update)
        },
    },
    state: {
        data: undefined,
        error: "",
        loading: false,
    },
})
