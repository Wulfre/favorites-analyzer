import { getFavoritePosts, getUser } from "~/actions/e621-client"
import type { Post } from "~/schemas/post"
import type { User } from "~/schemas/user"
import { useFormStore } from "~/stores/form"
import { createResource } from "~/utils/resource"

const useUserResource = createResource<User>(async () => {
    const { username } = useFormStore.getState()
    return getUser(username)
})

const useFavoritesResource = createResource<Post[]>(async () => {
    const { value } = useUserResource.getState()

    if (value === undefined) {
        throw new Error("no user in store")
    }

    return getFavoritePosts(value.id.toString(), value.favorite_count)
}, [])

export { useFavoritesResource, useUserResource }
