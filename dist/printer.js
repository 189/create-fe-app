'use strict';

var chalk = require('chalk');

var _require = require('./utils'),
    pad = _require.pad,
    launchedFromCmd = _require.launchedFromCmd;

var prompt = launchedFromCmd() ? '>' : '$';
var max = 8;
var keys = Object.keys;


module.exports = {
  makeEmptyLine: function makeEmptyLine() {
    console.log();
  },
  trace: function trace() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'create';
    var log = arguments[1];

    var word = type.padEnd(max, ' ');
    console.log('' + pad(1) + chalk.cyan('√ ' + word) + ': ' + log);
  },
  printInfo: function printInfo(_ref) {
    var _ref$title = _ref.title,
        title = _ref$title === undefined ? '' : _ref$title,
        _ref$body = _ref.body,
        body = _ref$body === undefined ? [] : _ref$body;

    console.log();
    console.log(pad(1) + title);
    body.forEach(function (log) {
      console.log(pad(2) + chalk.cyan(log));
    });
    console.log();
  },
  warn: function warn(log) {
    console.log(pad(1) + chalk.red(log));
  },
  guide: function guide(pname, scripts) {
    console.log();
    console.log(pad(1) + 'install dependencies:');
    console.log(pad(2) + '%s cd %s && npm install', prompt, pname);
    console.log();
    console.log(pad(1) + 'run the app:');
    keys(scripts).forEach(function (script) {
      if (script !== 'test') {
        console.log('' + pad(2) + prompt + ' npm run ' + script + ' : ' + scripts[script]);
      }
    });
  }
};