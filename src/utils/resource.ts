import { castDraft } from "immer"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

function createResource<T>(fetcher: () => Promise<T>) {
    type ResourceState = {
        value?: T
        loading: boolean
        set: (value: T) => void
        fetch: () => Promise<void>
    }

    return create(immer<ResourceState>((set) => ({
        value: undefined,
        loading: false,
        set: (value) => {
            set((state) => { state.value = castDraft<T>(value) })
        },
        fetch: async () => {
            set((state) => { state.loading = true })

            const value = await fetcher()

            set((state) => {
                state.value = castDraft<T>(value)
                state.loading = false
            })
        }
    })))
}

export { createResource }
