import { create } from "zustand"

type FormState = {
    username?: string
    setUsername: (username: string) => void
    limit?: number
    setLimit: (limit: number) => void
}

const useFormStore = create<FormState>((set) => ({
    username: "",
    setUsername: (username: string) => set({ username: username }),
    limit: 50,
    setLimit: (limit: number) => set({ limit: limit }),
}))

export { useFormStore }
