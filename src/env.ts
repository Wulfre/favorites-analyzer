// src/env.mjs
import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
    // Server environment schema. Build will fail if accessed on the client.
    server: {
        DATABASE_HOST: z.string(),
        DATABASE_USERNAME: z.string(),
        DATABASE_PASSWORD: z.string(),
        DATABASE_NAME: z.string(),
        DATABASE_PORT: z.number(),
    },
    // Client environment schema. These will have type errors if not prefixed with NEXT_PUBLIC_.
    client: {},
    // Server and client environment data.
    runtimeEnv: {
        DATABASE_HOST: process.env.DATABASE_HOST,
        DATABASE_USERNAME: process.env.DATABASE_USERNAME,
        DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
        DATABASE_NAME: process.env.DATABASE_NAME,
        DATABASE_PORT: process.env.DATABASE_PORT,
    },
})
