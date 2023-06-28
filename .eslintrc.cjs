const eslintConfig = {
    root: true,
    env: { "node": true, "browser": true, },
    parser: "@typescript-eslint/parser",
    settings: { "import/resolver": { "node": true, "typescript": true } },
    plugins: [
        "@typescript-eslint",
        "sort-exports",
        "import",
        "n",
        "eslint-comments",
        "promise",
        "unicorn",
        "sonarjs",
        "@unocss"
    ],
    extends: [
        "next/core-web-vitals",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:import/recommended",
        "plugin:import/typescript",
        "plugin:n/recommended",
        "plugin:eslint-comments/recommended",
        "plugin:promise/recommended",
        "plugin:unicorn/recommended",
        "plugin:sonarjs/recommended",
    ],
    rules: {
        // https://typescript-eslint.io/rules/semi
        "semi": ["off"], // prevent typescript conflict
        "@typescript-eslint/semi": ["warn", "never"],
        // https://typescript-eslint.io/rules/quotes
        "quotes": ["off"], // prevent typescript conflict
        "@typescript-eslint/quotes": ["warn", "double"],
        // https://eslint.org/docs/latest/rules/no-tabs
        "no-tabs": ["warn"],

        // https://typescript-eslint.io/rules/indent
        "indent": ["off"], // prevent typescript conflict
        "@typescript-eslint/indent": ["warn", 4],

        // https://github.com/un-es/eslint-plugin-i/blob/fork-release/docs/rules/first.md
        "import/first": ["warn"],
        // https://eslint.org/docs/latest/rules/sort-imports
        "sort-imports": ["warn", { "ignoreDeclarationSort": true }],
        // https://github.com/un-es/eslint-plugin-i/blob/fork-release/docs/rules/order.md
        "import/order": ["warn", { "alphabetize": { "order": "asc", "caseInsensitive": true }, }],
        // https://github.com/un-es/eslint-plugin-i/blob/fork-release/docs/rules/consistent-type-specifier-style.md
        "import/consistent-type-specifier-style": ["warn", "prefer-inline"],
        // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-missing-import.md
        "n/no-missing-import": ["off"], // seems to be broken when using typescript paths

        // https://github.com/un-es/eslint-plugin-i/blob/fork-release/docs/rules/exports-last.md
        "import/exports-last": ["warn"],
        // https://github.com/jrdrg/eslint-plugin-sort-exports
        "sort-exports/sort-exports": ["warn", { "sortDir": "asc", "ignoreCase": true, "sortExportKindFirst": "value" }],
        // https://github.com/un-es/eslint-plugin-i/blob/fork-release/docs/rules/no-mutable-exports.md
        "import/no-mutable-exports": ["error"],

        // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-reduce.md
        "unicorn/no-array-reduce": ["off"], // has its uses
        // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prevent-abbreviations.md
        "unicorn/prevent-abbreviations": ["off"], // some abbreviations are standard practice
    }
}

module.exports = eslintConfig
