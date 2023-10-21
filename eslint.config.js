import { antfu as configFactory } from "@antfu/eslint-config"

const defaultInterop = (module) => module.default ?? module

import * as _pluginOnlyWarn from "eslint-plugin-only-warn"
const pluginOnlyWarn = defaultInterop(_pluginOnlyWarn)

import * as _pluginPreferArrowFunctions from "eslint-plugin-prefer-arrow-functions"
const pluginPreferArrowFunctions = defaultInterop(_pluginPreferArrowFunctions)

import * as _pluginUnocss from "@unocss/eslint-plugin"
const pluginUnocss = defaultInterop(_pluginUnocss)

import * as _pluginSonarjs from "eslint-plugin-sonarjs"
const pluginSonarjs = defaultInterop(_pluginSonarjs)

import * as _pluginTypescript from "@typescript-eslint/eslint-plugin"
const pluginTypescript = defaultInterop(_pluginTypescript)

export default configFactory({
    ignores: ["*.config.?([cm])js"],
    typescript: { tsconfigPath: "tsconfig.json" },
    stylistic: {
        indent: 4,
        quotes: "double",
    },
    overrides: {
        typescript: {
            // add strict typescript rules from preset with correct prefix
            ...Object.entries(pluginTypescript.configs["strict-type-checked"].rules).reduce((acc, [key, value]) => {
                acc[key.replace("@typescript-eslint/", "ts/")] = value
                return acc
            }, {}),

            // disable included rules
            "ts/require-await": ["off"],

            // modify included rules
            "ts/consistent-type-definitions": ["warn", "type"],
            "ts/no-misused-promises": ["warn", { checksVoidReturn: false }],

            // enable included rules

            // enable new rules
        },
    },
}, {
    plugins: {
        "only-warn": pluginOnlyWarn,
        "prefer-arrow-functions": pluginPreferArrowFunctions,
        "sonarjs": pluginSonarjs,
        "@unocss": pluginUnocss
    },
    rules: {
        // disable included rules
        "no-void": ["off"],
        "antfu/top-level-function": ["off"],

        // modify included rules
        "arrow-parens": ["warn", "always"],
        "curly": ["warn", "all"],
        "node/prefer-global/process": ["warn", "always"],
        "style/jsx-curly-brace-presence": ["warn", "always"],
        "style/brace-style": ["warn", "1tbs", { allowSingleLine: true }],

        // enable included rules
        "eslint-comments/require-description": ["warn"],

        // enable new rules
        ...pluginSonarjs.configs.recommended.rules,
        ...pluginUnocss.configs.recommended.rules,
        "prefer-arrow-functions/prefer-arrow-functions": ["warn"],
    },
})
