import { defineAction } from "astro:actions"
import { z } from "astro:schema"
import { getUser, getUserFavorites, scoreTags } from "~/services/e621"

export const getSuggestions = defineAction({
    input: z.string(),
    handler: async (username) => {
        const user = await getUser(username)
        const favorites = await getUserFavorites(user.id)
        const tagScores = await scoreTags(favorites.posts.map((post) => post.tags))
        return tagScores
    },
})
