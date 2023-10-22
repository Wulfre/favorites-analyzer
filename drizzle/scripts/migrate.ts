import { migrate } from "drizzle-orm/libsql/migrator"
import { db } from "~/lib/drizzle"

console.info("migrating database...")
await migrate(db, { migrationsFolder: "./drizzle" })
console.info("migrated database successfully")

process.exit()
