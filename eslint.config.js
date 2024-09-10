import globals from "globals";
import pluginJs from "@eslint/js";
import security from "eslint-plugin-security";

export default [
  {
    languageOptions: { globals: globals.node },
    rules: {
      semi: "warn",
      "indent": ["error", 2]
    },
    plugins: {
      security: security
    }
  },
  pluginJs.configs.recommended,
];