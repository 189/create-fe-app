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
    cursor = _require2.cursor,
    erase = _require2.erase;

/**
 * TogglePrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Boolean} [opts.initial=false] Default value
 * @param {String} [opts.active='no'] Active label
 * @param {String} [opts.inactive='off'] Inactive label
 */


var TogglePrompt = function (_Prompt) {
  (0, _inherits3.default)(TogglePrompt, _Prompt);

  function TogglePrompt() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, TogglePrompt);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TogglePrompt.__proto__ || Object.getPrototypeOf(TogglePrompt)).call(this, opts));

    _this.msg = opts.message;
    _this.value = !!opts.initial;
    _this.active = opts.active;
    _this.inactive = opts.inactive;
    _this.initialValue = _this.value;
    _this.render(true);
    return _this;
  }

  (0, _createClass3.default)(TogglePrompt, [{
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
      this.done = true;
      this.aborted = false;
      this.fire();
      this.render();
      this.out.write('\n');
      this.close();
    }
  }, {
    key: 'deactivate',
    value: function deactivate() {
      if (this.value === false) return this.bell();
      this.value = false;
      this.render();
    }
  }, {
    key: 'activate',
    value: function activate() {
      if (this.value === true) return this.bell();
      this.value = true;
      this.render();
    }
  }, {
    key: 'delete',
    value: function _delete() {
      this.deactivate();
    }
  }, {
    key: 'left',
    value: function left() {
      this.deactivate();
    }
  }, {
    key: 'right',
    value: function right() {
      this.activate();
    }
  }, {
    key: 'down',
    value: function down() {
      this.deactivate();
    }
  }, {
    key: 'up',
    value: function up() {
      this.activate();
    }
  }, {
    key: 'next',
    value: function next() {
      this.value = !this.value;
      this.fire();
      this.render();
    }
  }, {
    key: '_',
    value: function _(c, key) {
      if (c === ' ') {
        this.value = !this.value;
        this.render();
      } else if (c === '1') {
        this.value = true;
        this.render();
      } else if (c === '0') {
        this.value = false;
        this.render();
      } else return this.bell();
    }
  }, {
    key: 'render',
    value: function render(first) {
      if (first) this.out.write(cursor.hide);

      this.out.write(erase.line + cursor.to(0) + [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(this.done), this.value ? this.inactive : color.cyan.underline(this.inactive), color.gray('/'), this.value ? color.cyan.underline(this.active) : this.active].join(' '));
    }
  }]);
  return TogglePrompt;
}(Prompt);

module.exports = TogglePrompt;