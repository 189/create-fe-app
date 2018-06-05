const webpack = require("webpack");
const chalk = require("chalk");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const WebpackNotifierPlugin = require("webpack-build-notifier");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackIncludeAssetsPlugin = require("html-webpack-include-assets-plugin");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const { entry, alias, provide, conf } = require("./config");
const { cssLoaders, styleLoaders, isProd } = require("./util");
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");
const { argv } = require("yargs");

const dist = typeof argv.dist == "string" ? argv.dist : "dist";
const srcPath = path.resolve(__dirname, "../src");
const cwd = process.cwd();
const loaderOptions = {
  minimize: true, //压缩css
  extract: true //提取css到单独文件
};
const loaders = cssLoaders(loaderOptions);
const styleloaders = styleLoaders(loaderOptions);
const root = process.cwd();

module.exports = {
  watch: false,
  entry: entry,
  devtool: false,
  output: {
    hashDigestLength: 8,
    path: `${root}/${dist}`,
    filename: isProd ? "[name].[chunkhash].js" : "[name].js",
    chunkFilename: isProd ? "[name]." + "[chunkhash]" + ".js" : "[name].js",
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
        use: ["babel-loader"],
        include: [srcPath]
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
          name: isProd ? "[name]_[sha512:hash:base64:7].[ext]" : "[name].[ext]"
        }
      }
    ]
  },
  plugins: [
    // new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.ProvidePlugin(provide),
    //进度条插件
    new ProgressBarPlugin({
      summary: false,
      format: chalk.green.bold("[:bar] :percent ") + chalk.yellow("(:elapsed seconds) :msg"),
      customSummary(buildTime) {
        process.stdout.write(
          chalk.green.bold(" ---------buildTime:" + buildTime + "---------\n")
        );
      }
    }),

    // https://github.com/RoccoC/webpack-build-notifier
    new WebpackNotifierPlugin({
      title: `前端自动化打包完成`,
      successSound: "Submarine",
      failureSound: "Glass",
      appName: Date.now() + "",
      suppressSuccess: true
    }),

    new ExtractTextPlugin({
      filename: isProd ? "[name].[contenthash:8].css" : "[name].css"
    }),

    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    //https://github.com/NMFR/optimize-css-assets-webpack-plugin/blob/master/README.md
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),

    // keep module.id stable when vender modules does not change
    //https://webpack.js.org/plugins/hashed-module-ids-plugin/#src/components/Sidebar/Sidebar.jsx
    new webpack.HashedModuleIdsPlugin(),

    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    // "manifest" should be placed at the end
    new webpack.optimize.CommonsChunkPlugin({
      name: ["vendor", "manifest"],
      minChunks: Infinity
    }),

    // https://github.com/johnagan/clean-webpack-plugin
    new CleanWebpackPlugin(['dist'], {
      root
    }),

    //允许错误不打断程序
    new webpack.NoEmitOnErrorsPlugin(),

    //https://github.com/jantimon/html-webpack-plugin
    new HtmlWebpackPlugin({
      title: "项目名称",
      template: "src/index.ejs",
      minify: {
        minifyJS: true,
        removeComments: true,
        removeEmptyAttributes: true
      },
      showHtmlWebpackPlugin: false // true:在模板页面显示`htmlWebpackPlugin`信息
    })
  ]
};
