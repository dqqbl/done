const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  /** 告知 webpack 使用相应模式的内置优化,'none' | 'development' | 'production' */
  mode: "production",
  /** webpack打包入口 */
  entry: path.join(__dirname, "../src/app.tsx"),
  /** 打包输出 */
  output: {
    // 输出目录
    path: path.join(__dirname, "../dist"),
    // 输出文件名
    filename: "bundle.js",
  },
  /** 配置模块如何解析 */
  resolve: {
    // 尝试按顺序解析这些后缀名文件
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
  },
  /** 配置如何处理项目中的不同类型的模块 */
  module: {
    // 配置解析规则
    rules: [
      {
        // 用正则匹配文件名
        test: /\.(j|t)sx?$/,
        // 排除匹配该规则的文件
        exclude: /node_modules/,
        // 应用于该规则的loader，以下是简写形式，具体可以参考webpack官网 Rule.use
        loader: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: [
          /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        ],
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // 8kb
          },
        },
        generator: {
          filename: "media/[hash][ext][query]",
        },
      },
    ],
  },
  /** 插件配置 */
  plugins: [
    /** 设置项目html模板文件 */
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "public/index.html",
      inject: true,
    }),
  ],
  /** 开发服务器配置 */
  devServer: {
    // 指定要使用的 host
    host: "localhost",
    port: 3000,
    // 当后端路由没有命中时返回index.html
    historyApiFallback: true,
    client: {
      // 当出现编译错误或警告时，在浏览器中显示全屏覆盖
      overlay: {
        errors: true,
        warnings: false,
      },
      // 在浏览器中以百分比显示编译进度
      progress: true,
    },
    // 启用模块热替换(HMR - hot module replacement)
    hot: true,
    // 服务器启动后自动在浏览器中打开项目
    // open: true,
  },
};
