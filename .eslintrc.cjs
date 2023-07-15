const eslintConfig = {
    root: true,
    parser: "@typescript-eslint/parser",
    parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
        ecmaFeatures: {
            jsx: true,
        },
        project: true,
    },
    settings: {
        "import/resolver": {
            typescript: {
                alwaysTryTypes: true,
                project: ["./tsconfig.json", "./packages/*/tsconfig.json"],
            },
        },
    },
    plugins: [
        "only-warn", // all broken rules are reported as warnings rahter than errors, regardless of configuration
        "@typescript-eslint",
        "eslint-comments",
        "functional",
        "import",
        "n",
        "prefer-arrow-functions",
        "promise",
        "simple-import-sort",
        "sonarjs",
        "unicorn",
    ],
    extends: [
        "next/core-web-vitals",
        "eslint:recommended",
        "plugin:@typescript-eslint/strict-type-checked",
        "plugin:@typescript-eslint/stylistic-type-checked",
        "plugin:eslint-comments/recommended",
        // "plugin:functional/lite", // broken for now: https://github.com/eslint-functional/eslint-plugin-functional/issues/678
        "plugin:import/recommended",
        "plugin:import/typescript",
        "plugin:n/recommended",
        "plugin:promise/recommended",
        "plugin:sonarjs/recommended",
        "plugin:unicorn/recommended",
    ],
    rules: {
        // ✨ DISABLE EXTENDED RULES
        "n/no-missing-import": ["off"], // taken care of by import/no-unresolved
        "unicorn/no-array-reduce": ["off"], // useful for functional programming
        "unicorn/no-useless-undefined": ["off"], // it is preferred to be explicit when using undefined
        "unicorn/prevent-abbreviations": ["off"], // some abbreviations are standard practice

        // ✨ ESLINT COMMENTS RULES
        "eslint-comments/no-unused-disable": ["warn"],
        "eslint-comments/require-description": ["warn"],

        // ✨ CORE RULES - FILE ENCODING
        "eol-last": ["warn", "always"],
        "linebreak-style": ["warn", "unix"],
        "no-tabs": ["warn"],
        "unicode-bom": ["warn", "never"],

        // ✨ CORE RULES - STYLE
        "array-bracket-newline": ["warn", "consistent"],
        "array-bracket-spacing": ["warn", "never"],
        "array-element-newline": ["warn", "consistent"],
        "arrow-body-style": ["warn", "as-needed"],
        "arrow-parens": ["warn", "always"],
        "arrow-spacing": ["warn"],
        "comma-style": ["warn", "last"],
        "computed-property-spacing": ["warn", "never"],
        "curly": ["warn", "all"], // require braces around all blocks, even single statement blocks
        "dot-location": ["warn", "property"],
        "function-call-argument-newline": ["warn", "consistent"],
        "function-paren-newline": ["warn", "multiline"],
        "implicit-arrow-linebreak": ["warn", "beside"],
        "max-statements-per-line": ["warn", { max: 1 }],
        "multiline-ternary": ["warn", "always-multiline"],
        "new-parens": ["warn", "always"],
        "newline-per-chained-call": ["warn", { ignoreChainWithDepth: 3 }],
        "no-floating-decimal": ["warn"],
        "no-lone-blocks": ["warn"],
        "no-multi-spaces": ["warn"],
        "no-multiple-empty-lines": ["warn", { max: 1 }],
        "no-trailing-spaces": ["warn"],
        "no-whitespace-before-property": ["warn"],
        "object-curly-newline": ["warn", { consistent: true }],
        "object-property-newline": ["warn", { allowAllPropertiesOnSameLine: true }],
        "object-shorthand": ["warn", "never"],
        "operator-linebreak": ["warn", "before"],
        "padded-blocks": ["warn", "never"],
        "quote-props": ["warn", "consistent-as-needed"],
        "rest-spread-spacing": ["warn", "never"],
        "space-in-parens": ["warn", "never"],
        "space-unary-ops": ["warn", { words: true, nonwords: false }],
        "spaced-comment": ["warn", "always"],
        "switch-colon-spacing": ["warn", { after: true, before: false }],
        "template-curly-spacing": ["warn", "never"],
        "template-tag-spacing": ["warn", "never"],
        "wrap-regex": ["warn"],

        // ✨ CORE RULES - STYLE - TYPESCRIPT OVERLAP
        "block-spacing": ["off"],
        "@typescript-eslint/block-spacing": ["warn", "always"],
        "brace-style": ["off"],
        "@typescript-eslint/brace-style": ["warn", "1tbs", { allowSingleLine: true }],
        "comma-dangle": ["off"],
        "@typescript-eslint/comma-dangle": ["warn", "always-multiline"],
        "comma-spacing": ["off"],
        "@typescript-eslint/comma-spacing": ["warn", { before: false, after: true }],
        "func-call-spacing": ["off"],
        "@typescript-eslint/func-call-spacing": ["warn", "never"],
        "indent": ["off"],
        "@typescript-eslint/indent": ["warn", 4],
        "key-spacing": ["off"],
        "@typescript-eslint/key-spacing": ["warn", { beforeColon: false, afterColon: true }],
        "keyword-spacing": ["off"],
        "@typescript-eslint/keyword-spacing": ["warn", { before: true, after: true }],
        "object-curly-spacing": ["off"],
        "@typescript-eslint/object-curly-spacing": ["warn", "always"],
        "quotes": ["off"],
        "@typescript-eslint/quotes": ["warn", "double", { avoidEscape: true }],
        "semi": ["off"],
        "@typescript-eslint/semi": ["warn", "never"],
        "space-before-blocks": ["off"],
        "@typescript-eslint/space-before-blocks": ["warn", "always"],
        "space-before-function-paren": ["off"],
        "@typescript-eslint/space-before-function-paren": ["warn", { anonymous: "always", named: "never", asyncArrow: "always" }],
        "space-infix-ops": ["off"],
        "@typescript-eslint/space-infix-ops": ["warn", { int32Hint: false }],

        // ✨ CORE RULES - LOGIC
        "eqeqeq": ["warn", "always"],
        "no-constant-binary-expression": ["warn"],
        "no-mixed-operators": ["warn"],
        "no-plusplus": ["warn"],
        "no-self-compare": ["warn"],
        "no-unmodified-loop-condition": ["warn"],
        "no-unreachable-loop": ["warn"],
        "no-unused-expressions": ["warn"],

        // ✨ CORE RULES - BEST PRACTICES
        "block-scoped-var": ["warn"],
        "complexity": ["warn", 10], // cyclomatic complexity, the number of independent paths through a block of code
        "consistent-return": ["warn"],
        "default-case-last": ["warn"],
        "default-case": ["warn"],
        "default-param-last": ["warn"],
        "max-depth": ["warn", 3], // maximum depth that blocks can be nested
        "no-eval": ["warn"],
        "no-implicit-coercion": ["warn"],
        "no-implied-eval": ["warn"],
        "no-multi-assign": ["warn"],
        "no-multi-str": ["warn"],
        "no-negated-condition": ["warn"],
        "no-param-reassign": ["warn"],
        "no-return-assign": ["warn"],
        "no-return-await": ["warn"],
        "no-sequences": ["warn"],
        "no-throw-literal": ["warn"],
        "no-unneeded-ternary": ["warn"],
        "no-useless-computed-key": ["warn"],
        "no-useless-concat": ["warn"],
        "no-useless-rename": ["warn"],
        "no-var": ["warn"],
        "prefer-const": ["warn"],
        "prefer-destructuring": ["warn"],
        "prefer-exponentiation-operator": ["warn"],
        "prefer-object-spread": ["warn"],
        "prefer-regex-literals": ["warn"],
        "prefer-rest-params": ["warn"],
        "prefer-spread": ["warn"],
        "prefer-template": ["warn"],
        "yoda": ["warn"],

        // ✨ CORE RULES - BEST PRACTICES - TYPESCRIPT OVERLAP
        "init-declarations": ["off"],
        "@typescript-eslint/init-declarations": ["warn"],
        "no-use-before-define": ["off"],
        "@typescript-eslint/no-use-before-define": ["warn"],

        // ✨ TYPESCRIPT RULES - STYLE
        "@typescript-eslint/member-delimiter-style": ["warn", { multiline: { delimiter: "comma" } }],
        "@typescript-eslint/type-annotation-spacing": ["warn", { before: false, after: true, overrides: { arrow: { before: true, after: true } } }],

        // ✨ TYPESCRIPT RULES - LOGIC
        "@typescript-eslint/strict-boolean-expressions": ["warn"],

        // ✨ TYPESCRIPT RULES - BEST PRACTICES
        "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
        "@typescript-eslint/consistent-type-imports": ["warn", { prefer: "type-imports", fixStyle: "separate-type-imports" }],
        "@typescript-eslint/explicit-function-return-type": ["warn", { allowExpressions: true }],
        "@typescript-eslint/no-unnecessary-qualifier": ["warn"],
        "@typescript-eslint/no-useless-empty-export": ["warn"],
        "@typescript-eslint/promise-function-async": ["warn"],
        "@typescript-eslint/switch-exhaustiveness-check": ["warn"],

        // ✨ IMPORT RULES - STYLE
        "import/consistent-type-specifier-style": ["warn", "prefer-top-level"],
        "import/exports-last": ["warn"],
        "import/first": ["warn"],
        "import/group-exports": ["warn"],
        "import/newline-after-import": ["warn"],

        // ✨ IMPORT RULES - LOGIC
        "import/no-extraneous-dependencies": ["warn"],
        "import/no-mutable-exports": ["warn"],
        "import/no-unused-modules": ["warn"],

        // ✨ IMPORT RULES - BEST PRACTICES
        "import/no-anonymous-default-export": ["warn"],
        "import/no-deprecated": ["warn"],
        "import/no-duplicates": ["warn"],
        "import/no-empty-named-blocks": ["warn"],
        "import/no-self-import": ["warn"],

        // ✨ SIMPLE IMPORT SORT RULES
        "sort-imports": ["off"],
        "import/order": ["off"],
        "simple-import-sort/exports": ["warn"],
        "simple-import-sort/imports": ["warn", { groups: [["^\\u0000", "^node:", "^@?\\w", "^", "^\\."]] }],

        // ✨ PREFERS ARROW FUNCTIONS RULES
        "prefer-arrow-functions/prefer-arrow-functions": ["warn", { singleReturnOnly: false, returnStyle: "implicit" }],
    },
    overrides: [
        {
            // ✨ ENABLE RULES SPECIFIC TO JSX FILES
            files: ["*.jsx", "*.tsx"],
            rules: {
                // ✨ UNICORN RULES - FILE ENCODING
                "unicorn/filename-case": ["warn", {
                    case: "pascalCase",
                    ignore: [
                        "layout.(jsx|tsx)",
                        "page.(jsx|tsx)",
                        "loading.(jsx|tsx)",
                    ],
                }],

                // ✨ JSX RULES - STYLE

                // ✨ JSX RULES - LOGIC
            },
        },
        {
            // ✨ DISABLE TYPE CHECKING IN JAVASCRIPT FILES
            files: ["*.js", "*.cjs", "*.mjs", "*.jsx"],
            extends: ["plugin:@typescript-eslint/disable-type-checked"],
        },
    ],
}

module.exports = eslintConfig
