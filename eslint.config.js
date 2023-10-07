import { antfu as configFactory } from "@antfu/eslint-config"

const defaultInterop = (module) => module.default ?? module

import * as _pluginTypescript from "@typescript-eslint/eslint-plugin"
const pluginTypescript = defaultInterop(_pluginTypescript)

import * as _pluginOnlyWarn from "eslint-plugin-only-warn"
const pluginOnlyWarn = defaultInterop(_pluginOnlyWarn)

import * as _pluginPreferArrowFunctions from "eslint-plugin-prefer-arrow-functions"
const pluginPreferArrowFunctions = defaultInterop(_pluginPreferArrowFunctions)

import * as _pluginSonarjs from "eslint-plugin-sonarjs"
const pluginSonarjs = defaultInterop(_pluginSonarjs)

import * as _pluginUnocss from "@unocss/eslint-plugin"
const pluginUnocss = defaultInterop(_pluginUnocss)

export default configFactory({
    ignores: ["*.config.?([cm])[jt]s"],
    typescript: { tsconfigPath: "tsconfig.json" },
    overrides: {
        jsonc: {
            "jsonc/indent": ["warn", 4]
        },
        typescript: {
            // add strict typescript rules from preset with correct prefix
            ...Object.entries(pluginTypescript.configs["strict-type-checked"].rules).reduce((acc, [key, value]) => {
                acc[key.replace("@typescript-eslint/", "ts/")] = value
                return acc
            }, {}),

            "ts/require-await": ["off"],

            "ts/consistent-type-definitions": ["warn", "type"],
            "ts/no-misused-promises": ["warn", { checksVoidReturn: false }],
        }
    }
}, {
    plugins: {
        "only-warn": pluginOnlyWarn,
        "prefer-arrow-functions": pluginPreferArrowFunctions,
        sonarjs: pluginSonarjs,
        "@unocss": pluginUnocss
    },
    rules: {
        // disable included rules
        "no-void": ["off"],
        "antfu/top-level-function": ["off"],

        // modify included rules
        "arrow-parens": ["warn", "always"],
        "style/indent": ["warn", 4],
        "style/quotes": ["warn", "double"],

        // enable included rules
        "eslint-comments/require-description": ["warn"],

        // enable new rules
        ...pluginSonarjs.configs.recommended.rules,
        ...pluginUnocss.configs.recommended.rules,
        "prefer-arrow-functions/prefer-arrow-functions": ["warn"],
    }
})
