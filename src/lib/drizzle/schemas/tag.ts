import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const tagTable = sqliteTable("tag", {
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
    post_count: integer("post_count").notNull(),
    related_tags: text("related_tags").notNull(),
    related_tags_updated_at: text("related_tags_updated_at").notNull(),
    category: integer("category").notNull(),
    is_locked: integer("is_locked", { mode: "boolean" }).notNull(),
    created_at: text("created_at").notNull(),
    updated_at: text("updated_at").notNull(),
})
