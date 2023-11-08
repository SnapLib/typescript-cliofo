module.exports = {
    root: true,
    env:
    {
        es2020: true,
        mocha: true,
        node: true
    },
    parser: "@typescript-eslint/parser",
    parserOptions:
    {
        sourceType: "module"
    },
    plugins:
    [
        "@stylistic",
        "@typescript-eslint"
    ],
    overrides:
    [
        {
            files: ["./src/main/ts/**/*.mts"],
            extends:
            [
                "eslint:recommended",
                "plugin:@typescript-eslint/recommended"
            ],
            parserOptions:
            {
                project: ["./tsconfig.json"]
            },
            rules:
            {
                "@typescript-eslint/adjacent-overload-signatures": "error",
                "@typescript-eslint/array-type": ["error", { "default": "array-simple" }],
                "@typescript-eslint/await-thenable": "error",
                "@typescript-eslint/no-inferrable-types": "off",
                "@typescript-eslint/no-empty-function": "warn",
                "@stylistic/block-spacing": "error",
                "@stylistic/brace-style": ["error", "allman", { "allowSingleLine": true }],
                "default-case": "error",
                "default-case-last": "error",
                "eol-last": "error",
                "no-console": "off",
                "no-empty-function": "off",
                "no-implicit-coercion": "error",
                quotes: ["error", "double", {"avoidEscape": true, "allowTemplateLiterals": true}],
                "no-tabs": "error",
                "no-trailing-spaces": "error",
                semi: "off",
                "@typescript-eslint/semi": ["error", "always"]
            }
        }
    ],
};
