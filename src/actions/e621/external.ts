"use server"

import pThrottle from "p-throttle"
import { z } from "zod"
import { clientString, pageLimit } from "./config"
import type { Post } from "~/schemas/post"
import type { User } from "~/schemas/user"
import { postSchema } from "~/schemas/post"
import { userSchema } from "~/schemas/user"

const throttle = pThrottle({
    limit: 2,
    interval: 1000,
})

export const getUser = throttle(async (username: string): Promise<User | undefined> => {
    const response = await fetch(`https://e621.net/users/${encodeURIComponent(username)}.json?_client=${clientString}`, { cache: "no-cache" })

    if (!response.ok) {
        throw new Error(`failed to fetch user data for user "${username}"`)
    }

    const user = userSchema.parse(await response.json())
    console.info(`fetched user data for user "${username}", id ${user.id}`)

    return user
})

export const getFavoritesPage = throttle(async (userId: number, page: number): Promise<Post[]> => {
    const defaultReturn: Post[] = []

    const responseSchema = z.object({
        posts: z.array(postSchema),
    })

    try {
        const response = await fetch(`https://e621.net/favorites.json?_client=${clientString}&user_id=${userId}&limit=${pageLimit}&page=${page}`, { cache: "no-cache" })

        if (!response.ok) {
            console.warn(`failed to fetch page ${page} of favorites for user ${userId}`)
            return defaultReturn
        }

        const { posts } = responseSchema.parse(await response.json())
        console.info(`fetched page ${page} of favorites for user ${userId}`)
        return posts
    } catch {
        console.error(`failed to fetch page ${page} of favorites for user ${userId}`)
        return defaultReturn
    }
})
