'use strict';

// npm run restore -- --dir dirname --...

var fs = require('fs-extra');
var parseArgs = require('minimist')(process.argv.slice(2));
var dir = parseArgs['dir'];
var path = require('path');

if (dir) {
  var dirPath = path.resolve(__dirname, '../templates', dir);
  var exist = fs.existsSync(dirPath);
  if (!exist) {
    console.error(dir + 'is not exist : [' + dirPath + ']');
    process.exit(0);
  }
  var pkg = path.resolve(dirPath, 'package.json');
  var _pkg = path.resolve(dirPath, '_package.json');
  fs.renameSync(pkg, _pkg);
}