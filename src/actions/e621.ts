"use server"

import pThrottle from "p-throttle"
import { z } from "zod"
import type { Post } from "~/schemas/post"
import type { User } from "~/schemas/user"
import { log } from "~/lib/log"
import { postSchema } from "~/schemas/post"
import { userSchema } from "~/schemas/user"
import { e621ClientString } from "~/utils/constants"

export const getUser = async (username: string): Promise<User | undefined> => {
    const response = await fetch(`https://e621.net/users/${encodeURIComponent(username)}.json?_client=${e621ClientString}`, {
        next: {
            revalidate: 60 * 60,
        },
    })

    if (!response.ok) {
        log.debug(`failed to fetch user data for user "${username}"`)
        return undefined
    }

    const user = userSchema.parse(await response.json())
    log.debug(`fetched user data for user "${username}", id ${user.id}`)

    return user
}

export const getFavorites = async (user: User): Promise<Post[] | undefined> => {
    const responseSchema = z.object({
        posts: z.array(postSchema),
    })

    const throttle = pThrottle({
        limit: 2,
        interval: 1000,
    })

    const pageLimit = 300
    const pages = Math.ceil(user.favorite_count / pageLimit)

    const requests = Array.from(
        { length: pages }, // create an array of length `pages`
        (_, index) => index + 1, // fill it with numbers from 1 to `pages`
    ).map(throttle(async (page) => {
        const response = await fetch(`https://e621.net/favorites.json?_client=${e621ClientString}&user_id=${user.id}&limit=${pageLimit}&page=${page}`, {
            next: {
                revalidate: 60 * 60,
            },
        })

        if (!response.ok) {
            log.debug(`failed to fetch page ${page} of favorites for user ${user.id}`)
            return []
        }

        const { posts } = responseSchema.parse(await response.json())
        log.debug(`fetched page ${page} of favorites for user ${user.id}, ${posts.length} posts`)
        return posts
    }))

    const pagesData = await Promise.allSettled(requests)
    return pagesData.flatMap((page) => page.status === "fulfilled" ? page.value : [])
}
