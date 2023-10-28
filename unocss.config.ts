import { defineConfig, presetUno, presetWebFonts } from "unocss"

export default defineConfig({
    presets: [
        presetUno(),
        presetWebFonts({
            provider: "google",
            fonts: {
                sans: {
                    name: "Atkinson Hyperlegible",
                    weights: [400, 700],
                    italic: true,
                },
                mono: {
                    name: "Source Code Pro",
                    weights: [400, 700],
                    italic: true,
                },
            },
        }),
    ],
    theme: {
        colors: {
            "paper-bg": "hsl(35 36% 95%)",
            "paper-muted": "hsl(35 22% 65%)",
            "paper": "hsl(35  8% 35%)",
            "pen-accent": "hsl(250 100% 65%)",
            "highlighter-orange": "hsl(35 15% 31%)",
            "highlighter-orange-muted": "hsl(35 22% 48%)",
            "highlighter-orange-bg": "hsl(35 100% 47% / 0.18)",
            "highlighter-green": "hsl(71 12% 30%)",
            "highlighter-green-muted": "hsl(71 19% 45%)",
            "highlighter-green-bg": "hsl(78 100% 37% / 0.19)",
            "highlighter-teal": "hsl(161 12% 31%)",
            "highlighter-teal-muted": "hsl(161 19% 46%)",
            "highlighter-teal-bg": "hsl(172 100% 37% / 0.15)",
            "highlighter-blue": "hsl(220 12% 34%)",
            "highlighter-blue-muted": "hsl(220 19% 54%)",
            "highlighter-blue-bg": "hsl(220 100% 73% / 0.20)",
            "highlighter-purple": "hsl(300 12% 34%)",
            "highlighter-purple-muted": "hsl(300 17% 53%)",
            "highlighter-purple-bg": "hsl(282 100% 68% / 0.15)",
        },
    },
})
