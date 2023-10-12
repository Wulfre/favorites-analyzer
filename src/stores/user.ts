import { observable } from "@legendapp/state"
import type { User } from "~/schemas/user"
import { getUser } from "~/actions/e621/external"

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

const defaultState: UserState = {
    data: undefined,
    error: "",
    loading: false,
}

export const $user = observable<UserStore>({
    actions: {
        fetchUser: async (username) => {
            $user.state.set({
                ...defaultState,
                loading: true,
            })

            const user = await getUser(username)

            const update = user === undefined
                ? {
                    ...defaultState,
                    error: "User not found.",
                }
                : {
                    ...defaultState,
                    data: user,
                }

            $user.state.set(update)
        },
    },
    state: defaultState,
})
