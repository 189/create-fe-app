/**
 * 构建生成未压缩的代码到dist目录，方便检查
 */
const webpack = require("webpack");
const chalk = require("chalk");
const webpackConfig = require("../webpack.config.prod");
const config = require("../../config");
const fs = require('fs');


webpackConfig.plugins.unshift(
  //定义环境变量
  new webpack.DefinePlugin({
    "process.env": {
        NODE_ENV: '"development"'
    },
    __DEV__: true,
    __PROD__: false
  })
);

webpackConfig.watch = true;
webpackConfig.devtool = "cheap-module-eval-source-map",
webpackConfig.output.publicPath = './';

webpack(webpackConfig, function(err, stats) {
    // console.log(' stats:',stats);
    if (err) {
        return console.error(err);
    }
    console.log(
        stats.toString({
            colors: true,
            hash: false,
            version: false,
            timings: false,
            assets: true, //true
            chunks: false, //true
            modules: false, //true
            chunkModules: false,
            children: false,
            errorDetails: true
        })
    );

    if (stats.hasErrors() || stats.hasWarnings()) {
        return console.log(
            chalk.yellow.bold("==================编译过程有错误或者警告==================")
        );
    }
    console.log(chalk.yellow.bold("========前端构建完成======="));
});
