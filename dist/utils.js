'use strict';

var util = require('util');
var fs = require('fs');
var utils = {};
var methods = ['readdir', 'stat', 'writeFile', 'readFile'];

/**
 * Promisify
 */
methods.forEach(function (method) {
  utils[method] = util.promisify(fs[method]);
});

/**
 * Determine if launched from cmd.exe
 */
function launchedFromCmd() {
  return process.platform === 'win32' && process.env._ === undefined;
}

/**
 * Compose data to {title:value}
 * @param {array} choices 
 */
function compose(choices) {
  return choices.map(function (choose) {
    return { title: choose, value: choose };
  });
}

/**
 * Fill with space for indentation
 * @param {number} level 
 */
function pad(level) {
  return ' '.repeat(level * 3);
}

module.exports = Object.assign(utils, {
  compose: compose,
  pad: pad,
  launchedFromCmd: launchedFromCmd
});