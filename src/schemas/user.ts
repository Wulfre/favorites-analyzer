import { object, number, boolean, string, nullable } from "valibot"
import type { Input } from "valibot"

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
