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

var color = require('clorox');
var Prompt = require('./prompt');

var _require = require('sisteransi'),
    cursor = _require.cursor,
    erase = _require.erase;

var _require2 = require('../util'),
    style = _require2.style,
    clear = _require2.clear;

var isNumber = /[0-9]/;
var isValidChar = /\.|-/;
var isDef = function isDef(any) {
  return any !== undefined;
};
var round = function round(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
};

/**
 * NumberPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {String} [opts.style='default'] Render style
 * @param {Number} [opts.initial] Default value
 * @param {Number} [opts.max=+Infinity] Max value
 * @param {Number} [opts.min=-Infinity] Min value
 * @param {Boolean} [opts.float=false] Parse input as floats
 * @param {Number} [opts.round=2] Round floats to x decimals
 * @param {Number} [opts.increment=1] Number to increment by when using arrow-keys
 */

var NumberPrompt = function (_Prompt) {
  (0, _inherits3.default)(NumberPrompt, _Prompt);

  function NumberPrompt() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, NumberPrompt);

    var _this = (0, _possibleConstructorReturn3.default)(this, (NumberPrompt.__proto__ || Object.getPrototypeOf(NumberPrompt)).call(this, opts));

    _this.transform = style.render(opts.style);
    _this.msg = opts.message;
    _this.initial = isDef(opts.initial) ? opts.initial : '';
    _this.float = !!opts.float;
    _this.round = opts.round || 2;
    _this.inc = opts.increment || 1;
    _this.min = isDef(opts.min) ? opts.min : -Infinity;
    _this.max = isDef(opts.max) ? opts.max : Infinity;
    _this.value = '';
    _this.typed = '';
    _this.lastHit = 0;
    _this.render();
    return _this;
  }

  (0, _createClass3.default)(NumberPrompt, [{
    key: 'parse',
    value: function parse(x) {
      return this.float ? parseFloat(x) : parseInt(x);
    }
  }, {
    key: 'valid',
    value: function valid(c) {
      return c === '-' || c === '.' && this.float || isNumber.test(c);
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.typed = '';
      this.value = '';
      this.fire();
      this.render();
    }
  }, {
    key: 'abort',
    value: function abort() {
      this.value = this.value || this.initial;
      this.done = this.aborted = true;
      this.fire();
      this.render();
      this.out.write('\n');
      this.close();
    }
  }, {
    key: 'submit',
    value: function submit() {
      this.value = this.value || this.initial;
      this.done = true;
      this.aborted = false;
      this.fire();
      this.render();
      this.out.write('\n');
      this.close();
    }
  }, {
    key: 'up',
    value: function up() {
      this.typed = '';
      if (this.value >= this.max) return this.bell();
      this.value += this.inc;
      this.fire();
      this.render();
    }
  }, {
    key: 'down',
    value: function down() {
      this.typed = '';
      if (this.value <= this.min) return this.bell();
      this.value -= this.inc;
      this.fire();
      this.render();
    }
  }, {
    key: 'delete',
    value: function _delete() {
      var val = this.value.toString();
      if (val.length === 0) return this.bell();
      this.value = this.parse(val = val.slice(0, -1)) || '';
      this.fire();
      this.render();
    }
  }, {
    key: 'next',
    value: function next() {
      this.value = this.initial;
      this.fire();
      this.render();
    }
  }, {
    key: '_',
    value: function _(c, key) {
      if (!this.valid(c)) return this.bell();

      var now = Date.now();
      if (now - this.lastHit > 1000) this.typed = ''; // 1s elapsed
      this.typed += c;
      this.lastHit = now;

      if (c === '.') return this.fire();

      this.value = Math.min(this.parse(this.typed), this.max);
      if (this.value > this.max) this.value = this.max;
      if (this.value < this.min) this.value = this.min;
      this.fire();
      this.render();
    }
  }, {
    key: 'render',
    value: function render() {
      var underline = !this.done || !this.done && !this.placeholder;
      this.out.write(erase.line + cursor.to(0) + [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(this.done), underline ? color.cyan.underline(this.rendered) : this.rendered].join(' '));
    }
  }, {
    key: 'value',
    set: function set(v) {
      if (!v && v !== 0) {
        this.placeholder = true;
        this.rendered = color.gray(this.transform.render('' + this.initial));
        this._value = '';
      } else {
        this.placeholder = false;
        this.rendered = this.transform.render('' + round(v, this.round));
        this._value = round(v, this.round);
      }
      this.fire();
    },
    get: function get() {
      return this._value;
    }
  }]);
  return NumberPrompt;
}(Prompt);

module.exports = NumberPrompt;