import { create } from "zustand"

type UserState = {
    name: string
}

type UserActions = {
    setName: (name: string) => void
}

type UserStore = {
    state: UserState
    actions: UserActions
}

export const useUserStore = create<UserStore>((set) => ({
    state: {
        name: "",
    },
    actions: {
        setName: (name: string) => set({ state: { name } })
    }
}))
