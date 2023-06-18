import { create } from "zustand"
import { type Post, getFavorites } from "~/actions/posts"
import { useFormStore } from "./form"

type PostState = {
    posts: Post[]
    postsLoading: boolean
    fetchPosts: () => Promise<void>
}

const usePostsStore = create<PostState>((set) => ({
    posts: [],
    postsLoading: false,
    fetchPosts: async () => {
        set({ postsLoading: true })

        const { username } = useFormStore.getState()
        set({ posts: await getFavorites(username) })

        set({ postsLoading: false })
    }
}))

export { usePostsStore }
