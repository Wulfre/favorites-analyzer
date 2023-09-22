"use server"

import { z } from "zod"
import { postSchema } from "~/schemas/post"
import { userSchema } from "~/schemas/user"
import { e621ClientString } from "~/utils/constants"

export const getUser = async (username: string) => {
    const response = await fetch(`https://e621.net/users/${encodeURIComponent(username)}.json?_client=${e621ClientString}`, {
        next: {
            revalidate: 60 * 60,
        },
    })
    return response.ok ? userSchema.parse(await response.json()) : undefined
}

export const getFavorites = async (userId: number) => {
    const response = await fetch(`https://e621.net/favorites.json?_client=${e621ClientString}&user_id=${userId}`, {
        next: {
            revalidate: 60 * 60,
        },
    })

    const responseSchema = z.object({
        posts: z.array(postSchema),
    })

    return response.ok ? responseSchema.parse(await response.json()).posts : undefined
}
