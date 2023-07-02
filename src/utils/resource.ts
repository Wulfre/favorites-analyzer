import { create } from "zustand"

function createResource<T>(fetcher: () => Promise<T>, initialValue: T) {
    type ResourceState = {
        value: T
        error?: Error
        loading: boolean
        fetch: () => Promise<void>
    }

    return create<ResourceState>((set) => ({
        value: initialValue,
        error: undefined,
        loading: false,
        fetch: async () => {
            set(() => ({ loading: true }))
            try {
                const value = await fetcher()
                set(() => ({ value: value, loading: false }))
            }
            catch (error) {
                set(() => ({ error: error instanceof Error ? error : new Error(String(error)), loading: false }))
            }
        }
    }))
}

export { createResource }
