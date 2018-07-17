'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var color = require('turbocolor');
var Prompt = require('./prompt');

var _require = require('../util'),
    style = _require.style,
    clear = _require.clear;

var _require2 = require('sisteransi'),
    erase = _require2.erase,
    cursor = _require2.cursor;

/**
 * SelectPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Array} opts.choices Array of choice objects
 * @param {String} [opts.hint] Hint to display
 * @param {Number} [opts.initial] Index of default value
 */


var SelectPrompt = function (_Prompt) {
  (0, _inherits3.default)(SelectPrompt, _Prompt);

  function SelectPrompt() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, SelectPrompt);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SelectPrompt.__proto__ || Object.getPrototypeOf(SelectPrompt)).call(this, opts));

    _this.msg = opts.message;
    _this.hint = opts.hint || '- Use arrow-keys. Return to submit.';
    _this.cursor = opts.initial || 0;
    _this.values = opts.choices || [];
    _this.value = opts.choices[_this.cursor].value;
    _this.clear = clear('');
    _this.render(true);
    return _this;
  }

  (0, _createClass3.default)(SelectPrompt, [{
    key: 'moveCursor',
    value: function moveCursor(n) {
      this.cursor = n;
      this.value = this.values[n].value;
      this.fire();
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.moveCursor(0);
      this.fire();
      this.render();
    }
  }, {
    key: 'abort',
    value: function abort() {
      this.done = this.aborted = true;
      this.fire();
      this.render();
      this.out.write('\n');
      this.close();
    }
  }, {
    key: 'submit',
    value: function submit() {
      this.done = true;
      this.aborted = false;
      this.fire();
      this.render();
      this.out.write('\n');
      this.close();
    }
  }, {
    key: 'first',
    value: function first() {
      this.moveCursor(0);
      this.render();
    }
  }, {
    key: 'last',
    value: function last() {
      this.moveCursor(this.values.length - 1);
      this.render();
    }
  }, {
    key: 'up',
    value: function up() {
      if (this.cursor === 0) return this.bell();
      this.moveCursor(this.cursor - 1);
      this.render();
    }
  }, {
    key: 'down',
    value: function down() {
      if (this.cursor === this.values.length - 1) return this.bell();
      this.moveCursor(this.cursor + 1);
      this.render();
    }
  }, {
    key: 'next',
    value: function next() {
      this.moveCursor((this.cursor + 1) % this.values.length);
      this.render();
    }
  }, {
    key: '_',
    value: function _(c, key) {
      if (c === ' ') return this.submit();
    }
  }, {
    key: 'render',
    value: function render(first) {
      var _this2 = this;

      if (first) this.out.write(cursor.hide);else this.out.write(erase.lines(this.values.length + 1));

      // Print prompt
      this.out.write([style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(false), this.done ? this.values[this.cursor].title : color.gray(this.hint)].join(' '));

      // Print choices
      if (!this.done) {
        this.out.write('\n' + this.values.map(function (v, i) {
          var title = _this2.cursor === i ? color.cyan.underline(v.title) : v.title;
          var prefix = _this2.cursor === i ? color.cyan('❯ ') : '  ';
          return prefix + ' ' + title;
        }).join('\n'));
      }
    }
  }]);
  return SelectPrompt;
}(Prompt);

module.exports = SelectPrompt;