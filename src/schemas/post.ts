import { z } from "zod"

export const categoryKeySchema = z.union([
    z.literal("general"),
    z.literal("species"),
    z.literal("character"),
    z.literal("artist"),
    z.literal("copyright"),
    z.literal("lore"),
    z.literal("meta"),
    z.literal("invalid"),
])

const postFileSchema = z.object({
    ext: z.string(),
    height: z.number(),
    md5: z.string(),
    size: z.number(),
    url: z.string().nullable(),
    width: z.number(),
})

const postFlagsSchema = z.object({
    deleted: z.boolean(),
    flagged: z.boolean(),
    note_locked: z.boolean(),
    pending: z.boolean(),
    rating_locked: z.boolean(),
    status_locked: z.boolean(),
})

const postPreviewSchema = z.object({
    height: z.number(),
    url: z.string().nullable(),
    width: z.number(),
})

const postRelationshipsSchema = z.object({
    children: z.array(z.number()),
    has_active_children: z.boolean(),
    has_children: z.boolean(),
    parent_id: z.number().nullable(),
})

const postSampleAlternatesSchema = z.record(z.object({
    height: z.number(),
    type: z.string(),
    urls: z.array(z.string().nullable()),
    width: z.number(),
}))

const postSampleSchema = z.object({
    alternates: postSampleAlternatesSchema,
    has: z.boolean(),
    height: z.number(),
    url: z.string().nullable(),
    width: z.number(),
})

const postScoreSchema = z.object({
    down: z.number(),
    total: z.number(),
    up: z.number(),
})

export const postSchema = z.object({
    approver_id: z.number().nullable(),
    change_seq: z.number(),
    comment_count: z.number(),
    created_at: z.string(),
    description: z.string(),
    duration: z.number().nullable(),
    fav_count: z.number(),
    file: postFileSchema,
    flags: postFlagsSchema,
    has_notes: z.boolean(),
    id: z.number(),
    is_favorited: z.boolean(),
    locked_tags: z.array(z.string()),
    pools: z.array(z.number()),
    preview: postPreviewSchema,
    rating: z.string(),
    relationships: postRelationshipsSchema,
    sample: postSampleSchema,
    score: postScoreSchema,
    sources: z.array(z.string()),
    tags: z.record(categoryKeySchema, z.array(z.string())),
    updated_at: z.string(),
    uploader_id: z.number(),
})
export type Post = z.infer<typeof postSchema>
