import { z } from "zod"

const categoryKeySchema = z.union([
    z.literal("general"),
    z.literal("species"),
    z.literal("character"),
    z.literal("artist"),
    z.literal("copyright"),
    z.literal("lore"),
    z.literal("meta"),
    z.literal("invalid"),
])
type CategoryKey = z.infer<typeof categoryKeySchema>

const postSchema = z.object({
    approver_id: z.number().nullable(),
    change_seq: z.number(),
    comment_count: z.number(),
    created_at: z.string(),
    description: z.string(),
    duration: z.number().nullable(),
    fav_count: z.number(),
    file: z.object({
        ext: z.string(),
        height: z.number(),
        md5: z.string(),
        size: z.number(),
        url: z.string().nullable(),
        width: z.number(),
    }),
    flags: z.object({
        deleted: z.boolean(),
        flagged: z.boolean(),
        note_locked: z.boolean(),
        pending: z.boolean(),
        rating_locked: z.boolean(),
        status_locked: z.boolean(),
    }),
    has_notes: z.boolean(),
    id: z.number(),
    is_favorited: z.boolean(),
    locked_tags: z.array(z.string()),
    pools: z.array(z.number()),
    preview: z.object({
        height: z.number(),
        url: z.string().nullable(),
        width: z.number(),
    }),
    rating: z.string(),
    relationships: z.object({
        children: z.array(z.number()),
        has_active_children: z.boolean(),
        has_children: z.boolean(),
        parent_id: z.number().nullable(),
    }),
    sample: z.object({
        alternates: z.record(z.object({
            height: z.number(),
            type: z.string(),
            urls: z.array(z.string().nullable()),
            width: z.number(),
        })),
        has: z.boolean(),
        height: z.number(),
        url: z.string().nullable(),
        width: z.number(),
    }),
    score: z.object({
        down: z.number(),
        total: z.number(),
        up: z.number(),
    }),
    sources: z.array(z.string()),
    tags: z.record(categoryKeySchema, z.array(z.string())),
    updated_at: z.string(),
    uploader_id: z.number(),
})
type Post = z.infer<typeof postSchema>

export { type CategoryKey, categoryKeySchema, type Post, postSchema }
