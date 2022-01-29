module.exports = {
  // 浏览器需要在哪些环境运行
  env: {
    browser: true,
    es2021: true,
    node: true,
    commonjs: true,
  },
  // 扩展 提供的是 eslint 现有规则的一系列预设，引入即生效
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
  ],
  // 解析器，用ts的解析器替换eslint默认的解析器
  parser: "@typescript-eslint/parser",
  // 解析器配置
  parserOptions: {
    sourceType: "module",
  },
  // 插件 相当于引入额外的规则集，仅引入规则列表，需配置才生效
  plugins: ["@typescript-eslint", "prettier"],
  // 全局变量
  globals: {
    React: true,
  },
  // 规则配置
  rules: {
    "react/react-in-jsx-scope": "off",
    "prettier/prettier": [
      "error",
      {
        printWidth: 120,
      },
    ],
  },
};
