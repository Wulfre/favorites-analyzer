import { observable } from "@legendapp/state"

type UserState = {
    name: string
}

export const $user = observable<UserState>({
    name: "",
})
