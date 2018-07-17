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

var _require = require('sisteransi'),
    cursor = _require.cursor;

var _require2 = require('../util'),
    style = _require2.style,
    clear = _require2.clear;

/**
 * TextPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {String} [opts.style='default'] Render style
 * @param {String} [opts.initial] Default value
 */


var TextPrompt = function (_Prompt) {
  (0, _inherits3.default)(TextPrompt, _Prompt);

  function TextPrompt() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, TextPrompt);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TextPrompt.__proto__ || Object.getPrototypeOf(TextPrompt)).call(this, opts));

    _this.transform = style.render(opts.style);
    _this.scale = _this.transform.scale;
    _this.msg = opts.message;
    _this.initial = opts.initial || '';
    _this.value = '';
    _this.cursor = _this.rendered.length;
    _this.clear = clear('');
    _this.render();
    return _this;
  }

  (0, _createClass3.default)(TextPrompt, [{
    key: 'reset',
    value: function reset() {
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
    key: 'next',
    value: function next() {
      if (!this.placeholder) return this.bell();
      this.value = this.initial;
      this.cursor = this.rendered.length;
      this.fire();
      this.render();
    }
  }, {
    key: 'moveCursor',
    value: function moveCursor(n) {
      if (this.placeholder) return;
      this.cursor = this.cursor + n;
    }
  }, {
    key: '_',
    value: function _(c, key) {
      var s1 = this.value.slice(0, this.cursor);
      var s2 = this.value.slice(this.cursor);
      this.moveCursor(1);
      this.value = '' + s1 + c + s2;
      if (this.placeholder) this.cursor = 0;
      this.render();
    }
  }, {
    key: 'delete',
    value: function _delete() {
      if (this.value.length === 0) return this.bell();
      var s1 = this.value.slice(0, this.cursor - 1);
      var s2 = this.value.slice(this.cursor);
      this.value = '' + s1 + s2;
      this.moveCursor(-1);
      this.render();
    }
  }, {
    key: 'first',
    value: function first() {
      this.cursor = 0;
      this.render();
    }
  }, {
    key: 'last',
    value: function last() {
      this.cursor = this.value.length;
      this.render();
    }
  }, {
    key: 'left',
    value: function left() {
      if (this.cursor <= 0 || this.placeholder) return this.bell();
      this.moveCursor(-1);
      this.render();
    }
  }, {
    key: 'right',
    value: function right() {
      if (this.cursor * this.scale >= this.rendered.length || this.placeholder) return this.bell();
      this.moveCursor(1);
      this.render();
    }
  }, {
    key: 'render',
    value: function render() {
      var prompt = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(this.done), this.rendered].join(' ');

      this.out.write(this.clear + prompt);
      this.out.write(cursor.move(this.placeholder ? -this.initial.length * this.scale : -this.rendered.length + this.cursor * this.scale));

      this.clear = clear(prompt);
    }
  }, {
    key: 'value',
    set: function set(v) {
      if (!v && this.initial) {
        this.placeholder = true;
        this.rendered = color.gray(this.transform.render(this.initial));
      } else {
        this.placeholder = false;
        this.rendered = this.transform.render(v);
      }
      this._value = v;
      this.fire();
    },
    get: function get() {
      return this._value;
    }
  }]);
  return TextPrompt;
}(Prompt);

module.exports = TextPrompt;