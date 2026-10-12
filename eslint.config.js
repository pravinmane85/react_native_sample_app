// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
  },
  {
    rules: {
      "max-len": ["warn", { code: 150, ignoreUrls: true, ignoreStrings: true, ignoreTemplateLiterals: true }],
      // JSX with more than 2 props goes one prop per line.
      "react/jsx-max-props-per-line": ["warn", { maximum: { single: 2, multi: 1 } }],
      "react/jsx-first-prop-new-line": ["warn", "multiline-multiprop"],
      "react/jsx-indent-props": ["warn", 2],
      "react/jsx-closing-bracket-location": ["warn", "line-aligned"],
    },
  }
]);
