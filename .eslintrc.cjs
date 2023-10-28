module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended-type-checked",
        "plugin:unicorn/recommended",
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
    root: true,
    rules: {
        // disable extended
        "unicorn/prevent-abbreviations": ["off"],
        "unicorn/text-encoding-identifier-case": ["off"],

        // general stylistic
        "@stylistic/indent": ["warn", 4],
        "@stylistic/quotes": ["warn", "double"],
        "@stylistic/semi": ["warn", "never"],
        "@stylistic/comma-dangle": ["warn", "always-multiline"],
        "style/brace-style": ["error", "1tbs", { allowSingleLine: true }],

        // typescript stylistic
        "@stylistic/member-delimiter-style": ["warn", {
            "multiline": { "delimiter": "none", "requireLast": false },
            "singleline": { "delimiter": "semi", "requireLast": false },
        }],

        // jsx stylistic

        // unicorn
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

                // astro stylistic
                "astro/semi": ["warn", "never"],
            },
        },
        {
            files: ["*.?(j|t)sx"],
            extends: [
                "preact",
                "plugin:jsx-a11y/recommended",
            ],
            rules: {
                // filename
                "unicorn/filename-case": ["warn", { "case": "pascalCase" }],
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
