const webpack = require("webpack");
const chalk = require("chalk");
const path = require("path");
const webpackConfig = require("../webpack.config.prod");
const { conf } = require("../config");

webpackConfig.plugins.unshift(
    //定义环境变量
    new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: '"production"'
        },
        __DEV__: false,
        __PROD__: true
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            drop_console: false
        }
    })
);

webpackConfig.output.publicPath = './';

webpack(webpackConfig, function(err, stats) {
    if (err) {
        throw err;
    }
    console.log(
        stats.toString({
            colors: true,
            hash: false,
            version: false,
            timings: false,
            assets: true,
            chunks: false,
            children: false,
            modules: false,
            errorDetails : true
        })
    );
    console.log(chalk.cyan(`构建完成`));
    return process.exit(0); //退出当前进程
});
