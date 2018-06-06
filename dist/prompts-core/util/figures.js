'use strict';

var main = {
  tick: '✔',
  cross: '✖',
  ellipsis: '…',
  pointerSmall: '›',
  line: '─',
  pointer: '❯'
};
var win = {
  tick: '√',
  cross: '×',
  ellipsis: '...',
  pointerSmall: '»',
  line: '─',
  pointer: '>'
};
var figures = process.platform === 'win32' ? win : main;

module.exports = figures;