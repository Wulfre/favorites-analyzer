"use server"

import { userSchema } from "~/schemas/user"
import { e621ClientString } from "~/utils/constants"

export const getUser = async (username: string) => {
    const response = await fetch(
        `https://e621.net/users/${encodeURIComponent(username)}.json?_client=${e621ClientString}`,
    )
    return response.ok ? userSchema.parse(await response.json()) : undefined
}
