import { create } from "zustand"

type FormState = {
    username: string
    setUsername: (username: string) => void
}

const useFormStore = create<FormState>((set) => ({
    username: '',
    setUsername: (username: string) => set({ username: username })
}))

export { useFormStore }
