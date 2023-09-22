import { z } from "zod"

export const tagSchema = z.object({
    category: z.number(),
    created_at: z.string(),
    id: z.number(),
    is_locked: z.boolean(),
    name: z.string(),
    post_count: z.number(),
    related_tags: z.string(),
    related_tags_updated_at: z.string(),
    updated_at: z.string(),
})
export type Tag = z.infer<typeof tagSchema>
