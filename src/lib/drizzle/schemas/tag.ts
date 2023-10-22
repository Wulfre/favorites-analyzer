import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const tag = sqliteTable("tag", {
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
    postCount: integer("post_count").notNull(),
    relatedTags: text("related_tags").notNull(),
    relatedTagsUpdatedAt: integer("related_tags_updated_at", { mode: "timestamp" }).notNull(),
    category: integer("category").notNull(),
    isLocked: integer("is_locked", { mode: "boolean" }).notNull(),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
})
