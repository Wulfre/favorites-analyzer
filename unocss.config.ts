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
            foreground: "#c0caf5",
            black: "#15161e",
            white: "#a9b1d6",
            red: "#f7768e",
            yellow: "#e0af68",
            green: "#9ece6a",
            cyan: "#7dcfff",
            blue: "#7aa2f7",
            magenta: "#bb9af7",
        },
    },
})

export default unocssConfig
