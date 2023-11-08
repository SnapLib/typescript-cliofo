module.exports = {
    root: true,
    env:
    {
        es2022: true,
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
                "class-methods-use-this": "off",
                "@typescript-eslint/class-methods-use-this": "error",
                "@stylistic/comma-dangle": "error",
                "@stylistic/comma-spacing": "error",
                "@typescript-eslint/consistent-type-assertions": ["error", {assertionStyle: "as", objectLiteralTypeAssertions: "never"}],
                "@typescript-eslint/consistent-type-exports": ["error", {fixMixedExportsWithInlineTypeSpecifier: true}],
                "@typescript-eslint/consistent-type-imports": ["error", {prefer: "type-imports", fixStyle: "inline-type-imports"}],
                "default-param-last": "off",
                "@typescript-eslint/default-param-last": "error",
                "@typescript-eslint/explicit-function-return-type": "error",
                "@typescript-eslint/explicit-member-accessibility": "error",
                "@typescript-eslint/explicit-module-boundary-types": "error",
                "@stylistic/func-call-spacing": "error",
                "@stylistic/key-spacing": ["error", { "beforeColon": false, "afterColon": true }],
                "@stylistic/keyword-spacing": "error",
                "@stylistic/lines-around-comment": ["error", {beforeBlockComment: true, allowBlockStart: true }],
                "@stylistic/member-delimiter-style": ["error", {multiline: {delimiter: "semi", requireLast: true}, singleline: {delimiter: "semi", requireLast: false}}],
                "@stylistic/no-extra-parens": "error",
                "@stylistic/no-extra-semi": "error",
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
