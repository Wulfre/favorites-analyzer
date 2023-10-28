import { signal } from "@preact/signals"
import { object, number, boolean, string, nullable, parseAsync } from "valibot"
import type { Input } from "valibot"
import { $toaster } from "~/components/Toaster"

export const userSchema = object({
    artist_version_count: number(),
    avatar_id: nullable(number()),
    base_upload_limit: number(),
    can_approve_posts: boolean(),
    can_upload_free: boolean(),
    comment_count: number(),
    created_at: string(),
    favorite_count: number(),
    flag_count: number(),
    forum_post_count: number(),
    id: number(),
    is_banned: boolean(),
    level: number(),
    level_string: string(),
    name: string(),
    negative_feedback_count: number(),
    neutral_feedback_count: number(),
    note_update_count: number(),
    pool_version_count: number(),
    positive_feedback_count: number(),
    post_update_count: number(),
    post_upload_count: number(),
    upload_limit: number(),
    wiki_page_version_count: number(),
})
export type User = Input<typeof userSchema>

export const clientString = encodeURIComponent("Favorites Analyzer/0.1 (by Wulfre)")

export const getUser = (async (username: string): Promise<User | undefined> => {
    const response = await fetch(`https://e621.net/users/${encodeURIComponent(username)}.json?_client=${clientString}`)

    if (!response.ok) {
        $toaster.actions.addToast({
            header: "Error",
            message: `Failed to fetch user ${username}`,
            type: "error",
        })
        return undefined
    }

    return parseAsync(userSchema, await response.json())
})

export const $user = {
    state: {
        user: signal<User | undefined>(undefined),
        loading: signal(false),
    },
    actions: {
        fetch: async (username: string) => {
            $user.state.loading.value = true
            $user.state.user.value = await getUser(username)
            $user.state.loading.value = false
        },
    },
}
