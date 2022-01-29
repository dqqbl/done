const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { merge } = require("webpack-merge");
const commonConf = require("./webpack.common");
const theme = require("../theme");

const prodConf = {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.less$/i,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]__[hash:base64:5]",
                exportLocalsConvention: "dashes",
              },
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  "postcss-preset-env",
                  // require("postcss-normalize")({
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
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
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
  plugins: [new MiniCssExtractPlugin()],
};

module.exports = merge(commonConf, prodConf);
