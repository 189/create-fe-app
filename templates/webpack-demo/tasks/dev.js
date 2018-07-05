
const webpack = require('webpack');
const middleWare = require('webpack-dev-middleware');
const merge = require('webpack-merge');
const express = require('express');
const utils = require('../utils');
const styleLoaders = utils.styleLoaders({extract : true, sourceMap : true});
const app = express();

let conf = merge(require('../webpack.base.conf'), {
  module : {
    rules : styleLoaders
  }
});
let compiler = webpack(conf);


app.use(middleWare(compiler, conf));

app.listen(3003, function() {
  console.log('dev-server wake up');
})











