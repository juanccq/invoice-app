import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {
    languageOptions: { globals: globals.node },
    rules: {
      semi: "warn",
      "indent": ["error", 2]
    }
  },
  pluginJs.configs.recommended,
];