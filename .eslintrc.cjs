/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  "extends": [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  "rules": {
    "object-curly-spacing": ["error", "always"],
    "no-trailing-spaces": ["error"],
    "comma-dangle": ["error", "always-multiline"],
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
    "vue/multi-word-component-names": ["off"],
    "sort-imports": [
      "error",
      {
        "ignoreCase": true,
        "ignoreDeclarationSort": true,
        "ignoreMemberSort": false,
        "memberSyntaxSortOrder": ["none", "all", "multiple", "single"],
      },
    ],
  },
};
