const webpack = require("webpack");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const WebpackNotifierPlugin = require("webpack-build-notifier");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const chalk = require("chalk");
const path = require("path");

const { timestamp, cssLoaders, styleLoaders } = require("./util");
const { entry, alias, provide } = require("./config");

const loaderOptions = { sourceMap: false, extract: false };
const styleloaders = styleLoaders(loaderOptions);
const loaders = cssLoaders(loaderOptions);

const config = {
  watch: true,
  entry: entry,
  devtool: "cheap-module-eval-source-map", // eval-source-map | source-map
  output: {
    hashDigestLength: 8,
    path: `${process.cwd()}/dist`,
    filename: "[name].js",
    chunkFilename: "[name]." + "[chunkhash]" + ".js",
    publicPath: "/"
  },
  resolve: {
    extensions: [".js", ".vue"],
    alias: alias
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: { compact: false, cacheDirectory: true }
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: loaders
        }
      },
      ...styleloaders,
      {
        test: /\.(png|jpg|gif|woff|woff2|ttf|eot|svg|swf)$/,
        loader: "file-loader",
        options: {
          name: "[name]_[sha512:hash:base64:7].[ext]"
        }
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin(provide),
    //进度条
    new ProgressBarPlugin({
      summary: false,
      format: chalk.green.bold("[:bar] :percent ") + chalk.yellow("(:elapsed seconds) :msg"),
      customSummary : function(buildTime) {
        process.stdout.write(
          chalk.cyan(timestamp()) + chalk.green.bold(" ---------buildTime:" + buildTime + "---------\n")
        );
      }
    }),

    // https://github.com/RoccoC/webpack-build-notifier
    new WebpackNotifierPlugin({
        title: `前端自动化打包完成`,
        successSound: "Submarine",
        failureSound: "Glass",
        suppressSuccess: true
    }),

    //定义环境变量
    new webpack.DefinePlugin({
      "process.env": { NODE_ENV: '"development"' },
      __DEV__: true,
      __PROD__: false
    }),

    new webpack.optimize.OccurrenceOrderPlugin(),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    //允许错误不打断程序
    new webpack.NoEmitOnErrorsPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "[name].js",
      minChunks: Infinity
    }),

    
    //https://github.com/jantimon/html-webpack-plugin
    new HtmlWebpackPlugin({
      chunks: ["vendor", "app"],
      title: "项目名称",
      template: "src/index.ejs",
      inject: true,
      alwaysWriteToDisk: true,
      showHtmlWebpackPlugin: false // true:在模板页面显示`htmlWebpackPlugin`信息
    })
  ]
};

module.exports = config;

