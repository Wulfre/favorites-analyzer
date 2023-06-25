import { z } from "zod"

const userSchema = z.object({
    id: z.number(),
    created_at: z.string(),
    name: z.string(),
    level: z.number(),
    base_upload_limit: z.number(),
    post_upload_count: z.number(),
    post_update_count: z.number(),
    note_update_count: z.number(),
    is_banned: z.boolean(),
    can_approve_posts: z.boolean(),
    can_upload_free: z.boolean(),
    level_string: z.string(),
    avatar_id: z.number().nullable(),
    wiki_page_version_count: z.number(),
    artist_version_count: z.number(),
    pool_version_count: z.number(),
    forum_post_count: z.number(),
    comment_count: z.number(),
    flag_count: z.number(),
    favorite_count: z.number(),
    positive_feedback_count: z.number(),
    neutral_feedback_count: z.number(),
    negative_feedback_count: z.number(),
    upload_limit: z.number(),
})
type User = z.infer<typeof userSchema>

export { type User, userSchema }
