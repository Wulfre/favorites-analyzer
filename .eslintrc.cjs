const eslintConfig = {
    root: true,
    env: {
        'node': true,
        'browser': true,
    },
    parser: '@typescript-eslint/parser',
    settings: {
        'import/resolver': {
            'node': true,
            'typescript': true
        }
    },
    plugins: [
        '@typescript-eslint',
        'import',
        'sort-exports'
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'eslint-config-next'
    ],
    rules: {
        // sort imports horizontally
        "sort-imports": ["error", { "ignoreDeclarationSort": true }],
        // sort imports vertically
        "import/order": ["error", {
            "alphabetize": { "order": "asc", "caseInsensitive": true },
            "pathGroups": [
                { pattern: '~/**', group: 'parent', position: 'before' },
            ]
        }],
        "import/first": ["error"],
        "import/consistent-type-specifier-style": ["error", "prefer-inline"],
        "import/exports-last": ["error"],
        "import/no-mutable-exports": ["error"],
        "sort-exports/sort-exports": ["error", { "sortDir": "asc", "ignoreCase": true, "sortExportKindFirst": "value" }],
    }
}

module.exports = eslintConfig
