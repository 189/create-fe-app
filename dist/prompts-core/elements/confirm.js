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

var _require = require('../util'),
    style = _require.style,
    clear = _require.clear;

var _require2 = require('sisteransi'),
    erase = _require2.erase,
    cursor = _require2.cursor;

/**
 * ConfirmPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Boolean} [opts.initial] Default value (true/false)
 */


var ConfirmPrompt = function (_Prompt) {
  (0, _inherits3.default)(ConfirmPrompt, _Prompt);

  function ConfirmPrompt() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, ConfirmPrompt);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ConfirmPrompt.__proto__ || Object.getPrototypeOf(ConfirmPrompt)).call(this, opts));

    _this.msg = opts.message;
    _this.value = opts.initial;
    _this.initialValue = !!opts.initial;
    _this.render(true);
    return _this;
  }

  (0, _createClass3.default)(ConfirmPrompt, [{
    key: 'reset',
    value: function reset() {
      this.value = this.initialValue;
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
      this.value = this.value || false;
      this.done = true;
      this.aborted = false;
      this.fire();
      this.render();
      this.out.write('\n');
      this.close();
    }
  }, {
    key: '_',
    value: function _(c, key) {
      if (c.toLowerCase() === 'y') {
        this.value = true;
        return this.submit();
      }
      if (c.toLowerCase() === 'n') {
        this.value = false;
        return this.submit();
      }
      return this.bell();
    }
  }, {
    key: 'render',
    value: function render(first) {
      if (first) this.out.write(cursor.hide);
      this.out.write(erase.line + cursor.to(0) + [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(this.done), this.done ? this.value ? 'yes' : 'no' : color.gray(this.initialValue ? '(Y/n)' : '(y/N)')].join(' '));
    }
  }]);
  return ConfirmPrompt;
}(Prompt);

module.exports = ConfirmPrompt;