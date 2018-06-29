
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');

let conf = merge(require('../webpack.base.conf'), {
    plugins : [
        new ExtractTextPlugin({
            filename: '[name].min.css',
            allChunks: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false,
            }
        })
    ]
});

webpack(conf, function(err, stats) {
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
      return console.log("编译过程有错误或者警告");
  }
  console.log("构建完成");
});












