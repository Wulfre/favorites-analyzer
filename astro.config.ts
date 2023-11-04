import { defineConfig } from "astro/config"
import unocss from "unocss/astro"
import vercel from "@astrojs/vercel/serverless"
import preact from "@astrojs/preact"

export default defineConfig({
    output: "server",
    adapter: vercel({
        webAnalytics: {
            enabled: true,
        },
        speedInsights: {
            enabled: true,
        },
    }),
    integrations: [
        preact(),
        unocss({
            injectReset: true,
        }),
    ],
})
