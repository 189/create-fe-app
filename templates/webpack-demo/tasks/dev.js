
const webpack = require('webpack');
const middleWare = require('webpack-dev-middleware');
const hotMiddleWare = require("webpack-hot-middleware");
const merge = require('webpack-merge');
const express = require('express');
const baseConf = require("../webpack.base.conf");
const utils = require('../utils');
const styleLoaders = utils.styleLoaders({extract : false, sourceMap : true});
const app = express();
const port = 3003;

const { keys } = Object;
// const hotScript = 'webpack-hot-middleware/client';
const hotScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=10000&reload=true';

baseConf.entry.main = [hotScript, baseConf.entry.main];

// baseConf.entry = compose(baseConf.entry);
// console.log(baseConf.entry);

let conf = merge(baseConf, {
  module : {
    rules : styleLoaders
  },
  plugins : [
    new webpack.HotModuleReplacementPlugin()
  ]
});
let compiler = webpack(conf);

app.use(middleWare(compiler, {
  logLevel : 'silent'
}));

app.use(hotMiddleWare(compiler, {
  noInfo: true, 
  publicPath: conf.output.publicPath || "/"
}));

app.listen(port, function() {
  console.log('dev-server wake up, open %s', "http://localhost:" + port);
})


// function compose(entry){
//   if(utils.isArray(entry)){
//     entry.unshift(hotScript);
//     return entry;
//   }
//   if(utils.isString(entry)){
//     return [hotScript, entry]
//   }
//   keys(entry).forEach(item => {
//     entry[item] = utils.isArray(item) ? (entry[item].unshift(hotScript), entry[item]) : [hotScript, entry[item]];
//   })
//   return entry;
// }










