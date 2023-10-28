module.exports = {
    root: true,
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended-type-checked",
        "plugin:@typescript-eslint/stylistic-type-checked",
        "plugin:import/recommended",
        "plugin:import/typescript",
        "plugin:unicorn/recommended",
        "plugin:sonarjs/recommended",
        "@unocss",
    ],
    plugins: [
        "only-warn",
        "@stylistic",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: true,
    },
    settings: {
        "import/resolver": {
            typescript: true,
        },
    },
    rules: {
        // disable extended
        "unicorn/prevent-abbreviations": ["off"],
        "unicorn/text-encoding-identifier-case": ["off"],
        "unicorn/no-useless-undefined": ["off"],
        "unicorn/no-array-for-each": ["off"],
        "unicorn/no-array-reduce": ["off"],

        // modify extended
        "@typescript-eslint/consistent-type-definitions": ["warn", "type"],

        // general stylistic
        "@stylistic/indent": ["warn", 4],
        "@stylistic/quotes": ["warn", "double"],
        "@stylistic/semi": ["warn", "never"],
        "@stylistic/comma-dangle": ["warn", "always-multiline"],
        "@stylistic/brace-style": ["error", "1tbs", { allowSingleLine: true }],

        // typescript stylistic
        "@stylistic/member-delimiter-style": ["warn", {
            "multiline": { "delimiter": "none", "requireLast": false },
            "singleline": { "delimiter": "semi", "requireLast": false },
        }],

        // jsx stylistic

        // enable new
        "unicorn/prefer-at": ["warn", { checkAllIndexAccess: true }],
    },
    overrides: [
        {
            files: ["*.astro"],
            parser: "astro-eslint-parser",
            parserOptions: {
                parser: "@typescript-eslint/parser",
                extraFileExtensions: [".astro"],
            },
            extends: [
                "plugin:astro/recommended",
                "plugin:astro/jsx-a11y-recommended",
            ],
            rules: {
                // filename
                "unicorn/filename-case": ["warn", { "case": "pascalCase", "ignore": ["index.astro"] }],

                // import adjustments for astro
                "import/no-unresolved": ["warn", { "ignore": ["^astro:"] }],

                // astro stylistic
                "astro/semi": ["warn", "never"],
            },
        },
        {
            files: ["*.?(j|t)sx"],
            settings: {
                react: {
                    // recommended version for preact
                    version: "16.0",
                },
            },
            extends: [
                "plugin:react/recommended",
                "plugin:react-hooks/recommended",
                "plugin:jsx-a11y/recommended",
            ],
            rules: {
                // filename
                "unicorn/filename-case": ["warn", { "case": "pascalCase" }],

                // disable react specific rules
                "react/react-in-jsx-scope": ["off"],
                "react/display-name": ["off"],

                // react adjustments for preact
                "react/no-unknown-property": ["warn", { ignore: ["class"] }],
            },
        },
        {
            files: ["*.?(c|m)js?(x)"],
            extends: [
                "plugin:@typescript-eslint/disable-type-checked",
            ],
        },
    ],
}
