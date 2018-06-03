
const util = require('util');
const fs = require('fs');
const utils = {};
const methods = ['readdir', 'stat', 'writeFile', 'readFile'];

methods.forEach(function(method){
  utils[method] = util.promisify(fs[method]);
})

module.exports = utils;

