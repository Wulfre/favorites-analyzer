import type { StoreApi, UseBoundStore } from "zustand"
import { create } from "zustand"

type ResourceState<T> = {
    value?: T,
    error?: Error,
    loading: boolean,
    fetch: () => Promise<void>,
}

const createResource = <T>(fetcher: () => Promise<T>, initialValue?: T): UseBoundStore<StoreApi<ResourceState<T>>> => (
    create<ResourceState<T>>((set) => ({
        value: initialValue,
        error: undefined,
        loading: false,
        fetch: async () => {
            set(() => ({ loading: true }))
            try {
                const value = await fetcher()
                set(() => ({ value: value, loading: false }))
            } catch (error) {
                set(() => ({ error: error instanceof Error ? error : new Error(String(error)), loading: false }))
            }
        },
    }))
)

export { createResource }
