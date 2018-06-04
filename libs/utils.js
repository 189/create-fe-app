
const util = require('util');
const fs = require('fs');
const utils = {};
const methods = ['readdir', 'stat', 'writeFile', 'readFile'];

methods.forEach(function(method){
  utils[method] = util.promisify(fs[method]);
})

utils.pad = level => ' '.repeat(level * 3);
utils.compose = choices => choices.map( choose => ({ title : choose, value : choose }));
module.exports = utils;

