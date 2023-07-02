import { getFavoritePosts, getUser } from "~/actions/e621-client"
import { useFormStore } from "~/stores/form"
import { createResource } from "~/utils/resource"

const useUserResource = createResource(async () => {
    const { username } = useFormStore.getState()

    if (!username) {
        throw new Error("no username in store")
    }

    return getUser(username)
}, Object.create(null))

const useFavoritesResource = createResource(async () => {
    const { value } = useUserResource.getState()

    if (!value) {
        throw new Error("no user in store")
    }

    return getFavoritePosts(value.id.toString(), value.favorite_count)
}, [])

export { useFavoritesResource, useUserResource }
