const { merge } = require("webpack-merge");
const commonConf = require("./webpack.common");
const theme = require("../theme");
// const demo = require("../demo.js");
// import demoColor from "../demo.js";
// console.log(demoColor);

const devConf = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.less$/i,
        // 排除node_modules，避免与antd样式冲突
        exclude: /node_modules/,
        // 另一种loader写法
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]__[hash:base64:5]",
                exportLocalsConvention: "dashes", // Only dashes in class names will be camelized
                // namedExport: true,
                // localsConvention: "camelCase",
              },
            },
          },
          {
            loader: "postcss-loader",
            options: {
              // 设置 PostCSS 选项与插件
              postcssOptions: {
                plugins: [
                  "postcss-preset-env",
                  // require("postcss-normalize")({
                  //   // 定义在CSS文件开头插入的CSS库
                  //   forceImport: "sanitize.css",
                  // }),
                ],
              },
            },
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                globalVars: theme,
              },
            },
          },
        ],
      },
      {
        test: /\.less$/i,
        // 单独处理node_modules的less
        include: /node_modules/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              // 不进行模块化
              modules: false,
            },
          },
          "postcss-loader",
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                modifyVars: theme,
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
  // devServer: {
  //   proxy: {
  //     "/api": {
  //       target: "http://localhost:8000/",
  //       pathRewrite: { "^/api": "" },
  //       changeOrigin: true,
  //     },
  //   },
  // },
};

module.exports = merge(commonConf, devConf);
