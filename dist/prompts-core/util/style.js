'use strict';

var c = require('clorox');
var figures = require('./figures');

// rendering user input.
var styles = Object.freeze({
  password: { scale: 1, render: function render(input) {
      return '*'.repeat(input.length);
    } },
  emoji: { scale: 2, render: function render(input) {
      return '😃'.repeat(input.length);
    } },
  invisible: { scale: 0, render: function render(input) {
      return '';
    } },
  default: { scale: 1, render: function render(input) {
      return '' + input;
    } }
});
var render = function render(type) {
  return styles[type] || styles.default;
};

// icon to signalize a prompt.
var symbols = Object.freeze({
  aborted: c.red(figures.cross),
  done: c.green(figures.tick),
  default: c.cyan('?')
});

var symbol = function symbol(done, aborted) {
  return aborted ? symbols.aborted : done ? symbols.done : symbols.default;
};

// between the question and the user's input.
var delimiter = function delimiter(completing) {
  return c.gray(completing ? figures.ellipsis : figures.pointerSmall);
};

var item = function item(expandable, expanded) {
  return c.gray(expandable ? expanded ? figures.pointerSmall : '+' : figures.line);
};

module.exports = {
  styles: styles,
  render: render,
  symbols: symbols,
  symbol: symbol,
  delimiter: delimiter,
  item: item
};