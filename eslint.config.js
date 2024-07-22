module.exports = {
  env: {
    node: true, // This enables Node.js global variables like `process`
    es6: true,
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
  rules: {
    // Add custom rules if needed
  },
};
