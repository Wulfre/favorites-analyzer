import { create } from "zustand"

type UserState = {
    name: string
}

type UserActions = {
    setName: (name: string) => void
}

type UserStore = {
    actions: UserActions
    state: UserState
}

export const useUserStore = create<UserStore>((set) => ({
    actions: {
        setName: (name: string) => { set({ state: { name: name } }) },
    },
    state: {
        name: "",
    },
}))
