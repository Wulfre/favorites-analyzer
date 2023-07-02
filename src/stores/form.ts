import { create } from "zustand"

type FormState = {
    username: string
    limit: number
}

const useFormStore = create<FormState>(() => ({
    username: "",
    limit: 50,
}))

export { useFormStore }
