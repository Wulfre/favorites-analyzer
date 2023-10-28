import { defineConfig, presetUno, presetWebFonts } from 'unocss'

export default defineConfig({
    presets: [
        presetUno(),
        presetWebFonts({
            provider: 'google',
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
                }
            }
        })
    ],
})
