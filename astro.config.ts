import cloudflare from "@astrojs/cloudflare"
import preact from "@astrojs/preact"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"

export default defineConfig({
    output: "static",
    integrations: [preact()],
    adapter: cloudflare({
        imageService: "cloudflare",
        platformProxy: {
            enabled: true,
        },
    }),
    vite: {
        plugins: [tailwindcss()],
    },
})
