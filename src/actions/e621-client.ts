/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable unicorn/prevent-abbreviations */

"use server"

import { z } from "zod"
import { type Post, postSchema } from "~/schemas/post"
import { type User, userSchema } from "~/schemas/user"

const client = "Favorites Analyzer/0.1 (by Wulfre)"

const getUser = async (username: string): Promise<User> => {
    const response = await fetch(`https://e621.net/users/${username}.json?_client=${client}`)

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

    const requests = Array.from({ length: pages }, (_, index) =>
        fetch(`https://e621.net/favorites.json?user_id=${userId}&limit=${limit}&page=${index + 1}&_client=${client}`, {
            cache: "no-store"
        })
            .then((response) => response.json())
            .then((response) => favoritesResponseSchema.parse(response).posts)
    )

    const responses = await Promise.all(requests)
    return responses.flat().filter((post) => !post.flags.deleted)
}

export { getFavoritePosts, getUser, }

export { type Post } from "~/schemas/post"
export { type User } from "~/schemas/user"
