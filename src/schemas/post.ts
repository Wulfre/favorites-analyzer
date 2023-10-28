import { object, union, literal, string, number, boolean, nullable, array, record } from "valibot"
import type { Input } from "valibot"

export const categoryKeySchema = union([
    literal("general"),
    literal("species"),
    literal("character"),
    literal("artist"),
    literal("copyright"),
    literal("lore"),
    literal("meta"),
    literal("invalid"),
])

const postFileSchema = object({
    ext: string(),
    height: number(),
    md5: string(),
    size: number(),
    url: nullable(string()),
    width: number(),
})

const postFlagsSchema = object({
    deleted: boolean(),
    flagged: boolean(),
    note_locked: boolean(),
    pending: boolean(),
    rating_locked: boolean(),
    status_locked: boolean(),
})

const postPreviewSchema = object({
    height: number(),
    url: nullable(string()),
    width: number(),
})

const postRelationshipsSchema = object({
    children: array(number()),
    has_active_children: boolean(),
    has_children: boolean(),
    parent_id: nullable(number()),
})

const postSampleAlternatesSchema = record(object({
    height: number(),
    type: string(),
    urls: nullable(array(string())),
    width: number(),
}))

const postSampleSchema = object({
    alternates: postSampleAlternatesSchema,
    has: boolean(),
    height: number(),
    url: nullable(string()),
    width: number(),
})

const postScoreSchema = object({
    down: number(),
    total: number(),
    up: number(),
})

export const postSchema = object({
    approver_id: nullable(number()),
    change_seq: number(),
    comment_count: number(),
    created_at: string(),
    description: string(),
    duration: nullable(number()),
    fav_count: number(),
    file: postFileSchema,
    flags: postFlagsSchema,
    has_notes: boolean(),
    id: number(),
    is_favorited: boolean(),
    locked_tags: array(string()),
    pools: array(number()),
    preview: postPreviewSchema,
    rating: string(),
    relationships: postRelationshipsSchema,
    sample: postSampleSchema,
    score: postScoreSchema,
    sources: array(string()),
    tags: record(categoryKeySchema, array(string())),
    updated_at: string(),
    uploader_id: number(),
})
export type Post = Input<typeof postSchema>
