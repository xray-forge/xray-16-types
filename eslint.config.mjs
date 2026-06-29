import jsPlugin from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import jestPlugin from "eslint-plugin-jest";
import jsdocPlugin from "eslint-plugin-jsdoc";
import globals from "globals";
import tsPlugin from "typescript-eslint";

export default [
  {
    ignores: ["plugins/**/*", "src/plugins/**/*.js", "docs/**/*", "node_modules/**/*"],
  },
  jsdocPlugin.configs["flat/recommended"],
  jsPlugin.configs.recommended,
  jestPlugin.configs["flat/style"],
  ...tsPlugin.configs.recommended,
  importPlugin.flatConfigs.errors,
  importPlugin.flatConfigs.typescript,
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.cts", "**/*.mts", "**/*.js", "**/*.cjs", "**/*.mjs"],
    plugins: {
      eslintConfigPrettier,
    },
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parser: tsParser,
    },
    rules: {
      // TypeScript relaxations: this package ships engine type bindings, where `any`, empty
      // interfaces, and non-null assertions are intentional and correct.
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-misused-new": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-unused-vars": "off",
      // Structural rules (auto-fixable) kept at error.
      "@typescript-eslint/array-type": ["error", { default: "generic" }],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      "@typescript-eslint/explicit-member-accessibility": ["error"],
      "import/default": "off",
      "import/named": "off",
      "import/namespace": "off",
      "import/no-duplicates": ["error", { "prefer-inline": true }],
      "import/no-unresolved": "off",
      "import/order": [
        "error",
        {
          alphabetize: {
            caseInsensitive: true,
            order: "asc",
          },
          groups: ["builtin", "external", "parent", "sibling", "index"],
          "newlines-between": "always",
          pathGroupsExcludedImportTypes: ["builtin"],
        },
      ],
      "padding-line-between-statements": [
        "error",
        {
          blankLine: "always",
          next: "return",
          prev: "*",
        },
        {
          blankLine: "always",
          next: ["const", "let", "var"],
          prev: "expression",
        },
        {
          blankLine: "always",
          next: "*",
          prev: ["const", "let", "var"],
        },
        {
          blankLine: "always",
          next: "*",
          prev: ["for", "if", "while", "do", "with"],
        },
        {
          blankLine: "always",
          next: ["function", "class"],
          prev: ["function", "class"],
        },
        {
          blankLine: "any",
          next: ["const", "let", "var"],
          prev: ["const", "let", "var"],
        },
      ],
      // JSDoc: TypeScript is the source of truth for types, so type-related JSDoc rules are off.
      "jsdoc/check-access": "off",
      "jsdoc/check-types": "off",
      "jsdoc/no-undefined-types": "off",
      "jsdoc/reject-any-type": "off",
      "jsdoc/reject-function-type": "off",
      "jsdoc/require-jsdoc": "off",
      "jsdoc/require-next-type": "off",
      "jsdoc/require-param-type": "off",
      "jsdoc/require-property-type": "off",
      "jsdoc/require-returns-check": "off",
      "jsdoc/require-returns-type": "off",
      "jsdoc/require-throws-type": "off",
      "jsdoc/require-yields": "off",
      "jsdoc/require-yields-check": "off",
      "jsdoc/require-yields-type": "off",
      "jsdoc/ts-no-empty-object-type": "off",
      "jsdoc/valid-types": "off",
      // JSDoc: structural blank-line rule kept at error (auto-fixable).
      "jsdoc/tag-lines": ["error", "any", { startLines: 1, endLines: 0 }],
      // JSDoc + comment standardisation: warnings during incremental adoption, not build-blocking.
      "jsdoc/check-tag-names": [
        "warn",
        { definedTags: ["group", "source", "customConstructor", "remarks", "internal", "LuabindClass"] },
      ],
      "jsdoc/require-description-complete-sentence": ["warn", { tags: ["param", "returns"] }],
      "jsdoc/require-param": "warn",
      "jsdoc/require-returns": "warn",
      // Tag order within each JSDoc block: `@source`, `@customConstructor`, `@group` first, then
      // any other tags in appearance order, then `@param` and `@returns` last. Reorder only,
      // without inserting blank lines between groups.
      "jsdoc/sort-tags": [
        "warn",
        {
          tagSequence: [
            { tags: ["source", "customConstructor", "group"] },
            { tags: ["-other"] },
            { tags: ["param", "returns"] },
          ],
          alphabetizeExtras: false,
          reportTagGroupSpacing: false,
          reportIntraTagGroupSpacing: false,
        },
      ],
      "capitalized-comments": [
        "warn",
        "always",
        {
          ignoreConsecutiveComments: true,
          ignorePattern: "c8|v8|eslint|prettier|webpack|@?ts-?|tslint|jshint|jscs|istanbul|globals?|exported|noinspection",
        },
      ],
    },
  },
  {
    // `public`/`private` accessibility modifiers are TypeScript-only syntax, invalid in plain JS files.
    files: ["**/*.js", "**/*.cjs", "**/*.mjs"],
    rules: {
      "@typescript-eslint/explicit-member-accessibility": "off",
    },
  },
];
