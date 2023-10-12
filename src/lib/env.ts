import { config } from "dotenv"
import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"
import { isNode } from "~/utils/runtime"

// If we are trying to use env variables outside of the nextjs runtime, we need to load them manually.
if (isNode() && process.env["NEXT_PUBLIC_ENV"] === undefined) {
    config({ path: ".env.local" })
}

export const env = createEnv({
    // Client environment schema. These will have type errors if not prefixed with NEXT_PUBLIC_.
    client: {
        NEXT_PUBLIC_ENV: z.enum(["development", "preview", "production"]),
    },
    // Server environment schema. Build will fail if accessed on the client.
    server: {},
    // Server and client environment data.
    experimental__runtimeEnv: {
        NEXT_PUBLIC_ENV: process.env["NEXT_PUBLIC_ENV"],
    },
})
