const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const resolve = args => path.resolve(__dirname, args);

module.exports = {
  entry : { main : resolve('./src/index') },
  output : {
    path : resolve('dist'),
    filename : '[name].min.js',
    publicPath : '/'
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
        test: /\.(png|jpg|gif|woff|woff2|ttf|eot|svg|swf)$/,
        loader: "file-loader",
        options: {
          name: "[name]_[sha512:hash:base64:7].[ext]"
        }
      }
    ]
  },
  plugins: [
    // 构建优化插件
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.min.js',
    }),
    
    new HtmlWebpackPlugin({
      template : resolve('index.template.html'),
      inject : true
    }),
    
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // 编译时(compile time)插件
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    })
  ]
};


