import { boolean, datetime, int, mysqlTable, text, varchar } from "drizzle-orm/mysql-core"

const tags = mysqlTable("tags", {
    id: int("id_external").primaryKey(),
    name: varchar("name", { length: 255 }),
    post_count: int("post_count"),
    related_tags: text("related_tags"),
    related_tags_updated_at: datetime("related_tags_updated_at"),
    category: int("category"),
    is_locked: boolean("is_locked"),
    created_at: datetime("created_at"),
    updated_at: datetime("updated_at"),
})

export default tags
