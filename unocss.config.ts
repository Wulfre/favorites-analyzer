import { defineConfig, presetIcons, presetUno, presetWebFonts } from 'unocss'

const unocssConfig = defineConfig({
    presets: [
        presetUno(),
        presetIcons(),
        presetWebFonts({
            provider: 'google',
            fonts: {
                sans: 'Atkinson Hyperlegible',
                mono: 'Source Code Pro'
            }
        }),
    ],
    theme: {
        colors: {
            background: '#1a1b26',
            foreground: '#c0caf5',
            black: '#15161e',
            red: '#f7768e',
            green: '#9ece6a',
            yellow: '#e0af68',
            blue: '#7aa2f7',
            magenta: '#bb9af7',
            cyan: '#7dcfff',
            white: '#a9b1d6',
        },
    },
})

export default unocssConfig
