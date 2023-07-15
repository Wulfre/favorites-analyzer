"use server"

import { z } from "zod"
import type { Post } from "~/schemas/post"
import { postSchema } from "~/schemas/post"
import type { Tag } from "~/schemas/tag"
import { tagSchema } from "~/schemas/tag"
import type { User } from "~/schemas/user"
import { userSchema } from "~/schemas/user"

const client = encodeURIComponent("Favorites Analyzer/0.1 (by Wulfre)")

const getUser = async (username: string): Promise<User> => {
    const response = await fetch(`https://e621.net/users/${encodeURIComponent(username)}.json?_client=${client}`)

    if (response.status === 404) {
        throw new Error("user not found")
    }

    return userSchema.parse(await response.json())
}

const favoritesResponseSchema = z.object({
    posts: z.array(postSchema),
})

const getFavoritePosts = async (userId: string, favoriteCount: number): Promise<Post[]> => {
    const limit = 320
    const pages = Math.ceil(favoriteCount / limit)

    const requests = Array.from({ length: pages }, async (_, index) => fetch(`https://e621.net/favorites.json?user_id=${encodeURIComponent(userId)}&limit=${limit}&page=${index + 1}&_client=${client}`, {
        cache: "no-store",
    })
        .then(async (response) => response.json())
        .then((response) => favoritesResponseSchema.parse(response).posts))

    const responses = await Promise.all(requests)
    return responses.flat().filter((post) => !post.flags.deleted)
}

const getTag = async (tag: string): Promise<Tag> => {
    const response = await fetch(`https://e621.net/tags/${encodeURIComponent(tag)}.json?_client=${client}`)

    if (response.status === 404) {
        throw new Error("tag not found")
    }

    return tagSchema.parse(await response.json())
}

export { getFavoritePosts, getTag, getUser }
