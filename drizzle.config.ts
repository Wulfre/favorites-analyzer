import type { Config } from "drizzle-kit"
import { env } from "./src/lib/env"

export default {
    schema: "./src/lib/drizzle/schemas/*",
    out: "./drizzle",
    driver: "turso",
    dbCredentials: {
        url: env.DATABASE_URL,
        authToken: env.DATABASE_TOKEN ?? "",
    },
} satisfies Config
