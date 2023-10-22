"use server"

import pThrottle from "p-throttle"
import { z } from "zod"
import { eq } from "drizzle-orm"
import { clientString, pageLimit } from "./config"
import type { Post } from "~/schemas/post"
import type { User } from "~/schemas/user"
import { postSchema } from "~/schemas/post"
import { userSchema } from "~/schemas/user"
import type { Tag } from "~/schemas/tag"
import { db } from "~/lib/drizzle"
import { tagTable } from "~/lib/drizzle/schemas/tag"
import { tagSchema } from "~/schemas/tag"

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

    const response = await fetch(`https://e621.net/favorites.json?_client=${clientString}&user_id=${userId}&limit=${pageLimit}&page=${page}`, { cache: "no-cache" })

    if (!response.ok) {
        console.warn(`failed to fetch page ${page} of favorites for user ${userId}`)
        return defaultReturn
    }

    const { posts } = responseSchema.parse(await response.json())

    console.info(`fetched page ${page} of favorites for user ${userId}`)
    return posts
})

export const getTag = throttle(async (tag: string): Promise<Tag | undefined> => {
    const [dbTag] = await db.select().from(tagTable).where(eq(tagTable.name, tag)).limit(1)

    // TODO: check if tag has been updated in the last X days, and if so, update it in the db
    if (dbTag !== undefined) {
        console.info(`fetched tag data for tag "${tag}" from db, id ${dbTag.id}`)
        return dbTag
    }

    const response = await fetch(`https://e621.net/tags.json?_client=${clientString}&search[name_matches]=${encodeURIComponent(tag)}&limit=1`, { cache: "no-cache" })

    if (!response.ok) {
        throw new Error(`failed to fetch tag data for tag "${tag}"`)
    }

    const [foundTag] = z.array(tagSchema).parse(await response.json())

    if (!foundTag) {
        throw new Error(`failed to fetch tag data for tag "${tag}"`)
    }

    await db.insert(tagTable).values(foundTag)

    console.info(`fetched tag data for tag "${tag}", id ${foundTag.id}`)
    return foundTag
})
