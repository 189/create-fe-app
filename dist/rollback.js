'use strict';

// npm run rollback -- --seal --dir dirname --...

var fs = require('fs-extra');
var parseArgs = require('minimist')(process.argv.slice(2));
var dir = parseArgs['dir'];
var seal = parseArgs['seal'];
var path = require('path');

if (dir) {
  var pkg = void 0,
      _pkg = void 0;
  var dirPath = path.resolve(__dirname, '../templates', dir);
  var exist = fs.existsSync(dirPath);
  if (!exist) {
    console.error(dir + 'is not exist : [' + dirPath + ']');
    process.exit(0);
  }

  pkg = path.resolve(dirPath, 'package.json');
  _pkg = path.resolve(dirPath, '_package.json');

  if (!seal) {
    fs.renameSync(_pkg, pkg);
  } else {
    fs.renameSync(pkg, _pkg);
  }
}