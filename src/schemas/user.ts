import { z } from "zod"

export const userSchema = z.object({
    artist_version_count: z.number(),
    avatar_id: z.number().nullable(),
    base_upload_limit: z.number(),
    can_approve_posts: z.boolean(),
    can_upload_free: z.boolean(),
    comment_count: z.number(),
    created_at: z.string(),
    favorite_count: z.number(),
    flag_count: z.number(),
    forum_post_count: z.number(),
    id: z.number(),
    is_banned: z.boolean(),
    level: z.number(),
    level_string: z.string(),
    name: z.string(),
    negative_feedback_count: z.number(),
    neutral_feedback_count: z.number(),
    note_update_count: z.number(),
    pool_version_count: z.number(),
    positive_feedback_count: z.number(),
    post_update_count: z.number(),
    post_upload_count: z.number(),
    upload_limit: z.number(),
    wiki_page_version_count: z.number(),
})
export type User = z.infer<typeof userSchema>
