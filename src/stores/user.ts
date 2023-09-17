import { observable } from "@legendapp/state"
import type { User } from "~/schemas/user"
import { userSchema } from "~/schemas/user"
import { e621ClientString } from "~/utils/constants"

type UserState = {
    user: {
        data: User | undefined
        error: string
        loading: boolean
    }
    username: string
}

type UserActions = {
    fetchUser: () => Promise<void>
}

export const $user = observable<UserState & UserActions>({
    fetchUser: async () => {
        $user.user.set({
            data: $user.user.data.get(),
            error: "",
            loading: true,
        })

        const response = await fetch(
            `https://e621.net/users/${encodeURIComponent($user.username.get())}.json?_client=${e621ClientString}`,
        )

        const update = response.ok
            ? {
                data: userSchema.parse(await response.json()),
                error: "",
                loading: false,
            }
            : {
                data: $user.user.data.get(),
                error: "User not found",
                loading: false,
            }

        $user.user.set(update)
    },
    user: {
        data: undefined,
        error: "",
        loading: false,
    },
    username: "",
})
