// src/env.mjs
import { loadEnvConfig } from "@next/env"
import { createEnv } from "@t3-oss/env-nextjs"

// If we are trying to use env variables outside of the nextjs runtime, we need to load the env manually.
if (process.env["__NEXT_PROCESSED_ENV"] === undefined) {
    loadEnvConfig(process.cwd())
}

export const env = createEnv({
    // Client environment schema. These will have type errors if not prefixed with NEXT_PUBLIC_.
    client: {},
    // Server and client environment data.
    get runtimeEnv(): object { return { ...this.client, ...this.server } },
    // Server environment schema. Build will fail if accessed on the client.
    server: {},
})
