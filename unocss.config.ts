import { defineConfig, presetIcons, presetUno, presetWebFonts } from "unocss"

const unocssConfig = defineConfig({
    presets: [
        presetUno(),
        presetIcons(),
        presetWebFonts({
            fonts: {
                mono: "Source Code Pro",
                sans: "Atkinson Hyperlegible",
            },
            provider: "google",
        }),
    ],
    theme: {
        colors: {
            background: "#1a1b26",
            black: "#15161e",
            blue: "#7aa2f7",
            cyan: "#7dcfff",
            foreground: "#c0caf5",
            green: "#9ece6a",
            magenta: "#bb9af7",
            red: "#f7768e",
            white: "#a9b1d6",
            yellow: "#e0af68",
        },
    },
})

export default unocssConfig
