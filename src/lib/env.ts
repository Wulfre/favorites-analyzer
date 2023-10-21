import { config } from "dotenv"
import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"
import { isNode } from "~/utils/runtime"

// if we are trying to use env variables outside of the nextjs runtime, we need to load them manually
if (isNode() && process.env["NEXT_PUBLIC_ENV"] === undefined) {
    config({ path: ".env.local" })
}

export const env = createEnv({
    // client environment schema, these will have type errors if not prefixed with NEXT_PUBLIC_
    client: {
        NEXT_PUBLIC_ENV: z.enum(["development", "preview", "production"]),
    },
    // server environment schema, build will fail if accessed on the client
    server: {},
    // access client data
    experimental__runtimeEnv: {
        NEXT_PUBLIC_ENV: process.env["NEXT_PUBLIC_ENV"],
    },
})
