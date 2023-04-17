module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ["prettier", "plugin:jest/recommended", "plugin:jsdoc/recommended"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
  },
  plugins: ["prettier", "jest", "jsdoc"],
  rules: {
    "prettier/prettier": 2,
    camelcase: "off",
    "comma-dangle": "off",
    "generator-star-spacing": "off",
    "max-len": "off",
    "operator-linebreak": "off",
    "jsdoc/require-param-description": "off",
  },
};
