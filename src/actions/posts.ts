"use server"

import { z } from "zod";

const postSchema = z.object({
    id: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
    file: z.object({
        width: z.number(),
        height: z.number(),
        ext: z.string(),
        size: z.number(),
        md5: z.string(),
        url: z.string().nullable(),
    }),
    preview: z.object({
        width: z.number(),
        height: z.number(),
        url: z.string().nullable(),
    }),
    sample: z.object({
        has: z.boolean(),
        height: z.number(),
        width: z.number(),
        url: z.string().nullable(),
        alternates: z.record(z.object({
            type: z.string(),
            height: z.number(),
            width: z.number(),
            urls: z.array(z.string().nullable()),
        })),
    }),
    score: z.object({
        up: z.number(),
        down: z.number(),
        total: z.number(),
    }),
    tags: z.object({
        general: z.array(z.string()),
        species: z.array(z.string()),
        character: z.array(z.string()),
        artist: z.array(z.string()),
        invalid: z.array(z.string()),
        lore: z.array(z.string()),
        meta: z.array(z.string()),
    }),
    locked_tags: z.array(z.string()),
    change_seq: z.number(),
    flags: z.object({
        pending: z.boolean(),
        flagged: z.boolean(),
        note_locked: z.boolean(),
        status_locked: z.boolean(),
        rating_locked: z.boolean(),
        deleted: z.boolean(),
    }),
    rating: z.string(),
    fav_count: z.number(),
    sources: z.array(z.string()),
    pools: z.array(z.number()),
    relationships: z.object({
        parent_id: z.number().nullable(),
        has_children: z.boolean(),
        has_active_children: z.boolean(),
        children: z.array(z.number()),
    }),
    approver_id: z.number().nullable(),
    uploader_id: z.number(),
    description: z.string(),
    comment_count: z.number(),
    is_favorited: z.boolean(),
    has_notes: z.boolean(),
    duration: z.number().nullable(),
});
type Post = z.infer<typeof postSchema>;

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
})
type User = z.infer<typeof userSchema>;

const client = 'Favorites Analyzer/0.1 (by Wulfre)';

const getUser = async (username: string): Promise<User[]> => {
    const response = await fetch(`https://e621.net/users.json?search[name_matches]=${username}&_client=${client}`)
    const data = await response.json()
    userSchema.array().parse(data)
    return data
}

const postsResponseSchema = z.object({
    posts: z.array(postSchema).optional(),
    success: z.boolean().optional(),
    reason: z.string().optional(),
})

const getFavorites = async (username: string): Promise<Post[]> => {
    const userId = (await getUser(username))?.[0]?.id
    if (!userId) {
        return []
    }

    const response = await fetch(`https://e621.net/favorites.json?user_id=${userId}&_client=${client}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    postsResponseSchema.parse(data)
    return data.posts ?? []
}

export { getFavorites, type Post }
