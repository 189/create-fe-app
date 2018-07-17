'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var util = require('../util');
var color = require('turbocolor');
var Prompt = require('./prompt');

var _require = require('sisteransi'),
    cursor = _require.cursor;

// Get value, with fallback to title


var getVal = function getVal(arr, i) {
  return arr[i] && (arr[i].value || arr[i].title || arr[i]);
};

/**
 * TextPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Array} opts.choices Array of auto-complete choices objects
 * @param {Function} [opts.suggest] Filter function. Defaults to sort by title
 * @param {Number} [opts.limit=10] Max number of results to show
 * @param {Number} [opts.cursor=0] Cursor start position
 * @param {String} [opts.style='default'] Render style
 * @param {String} [opts.fallback] Fallback message - initial to default value
 * @param {String} [opts.initial] Index of the default value
 */

var AutocompletePrompt = function (_Prompt) {
  (0, _inherits3.default)(AutocompletePrompt, _Prompt);

  function AutocompletePrompt() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, AutocompletePrompt);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AutocompletePrompt.__proto__ || Object.getPrototypeOf(AutocompletePrompt)).call(this, opts));

    _this.msg = opts.message;
    _this.suggest = opts.suggest;
    _this.choices = opts.choices;
    _this.initial = opts.initial;
    _this.cursor = opts.initial || opts.cursor || 0;
    _this.fallback = opts.fallback || opts.initial !== void 0 ? '\u203A ' + getVal(_this.choices, _this.initial) : '\u203A no matches found';
    _this.suggestions = [];
    _this.input = '';
    _this.limit = opts.limit || 10;
    _this.transform = util.style.render(opts.style);
    _this.render = _this.render.bind(_this);
    _this.complete = _this.complete.bind(_this);
    _this.clear = util.clear('');
    _this.complete(_this.render);
    _this.render(true);
    return _this;
  }

  (0, _createClass3.default)(AutocompletePrompt, [{
    key: 'moveCursor',
    value: function moveCursor(i) {
      this.cursor = i;
      if (this.suggestions.length > 0) this.value = getVal(this.suggestions, i);else this.value = this.initial !== void 0 ? getVal(this.choices, this.initial) : null;
      this.fire();
    }
  }, {
    key: 'complete',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(cb) {
        var p, suggestions, l;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                p = this.completing = this.suggest(this.input, this.choices);
                _context.next = 3;
                return p;

              case 3:
                suggestions = _context.sent;

                if (!(this.completing !== p)) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt('return');

              case 6:

                this.suggestions = suggestions.slice(0, this.limit).map(function (s) {
                  return util.strip(s);
                });
                this.completing = false;

                l = Math.max(suggestions.length - 1, 0);

                this.moveCursor(Math.min(l, this.cursor));

                cb && cb();

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function complete(_x2) {
        return _ref.apply(this, arguments);
      }

      return complete;
    }()
  }, {
    key: 'reset',
    value: function reset() {
      var _this2 = this;

      this.input = '';
      this.complete(function () {
        _this2.moveCursor(_this2.initial !== void 0 ? _this2.initial : 0);
        _this2.render();
      });
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
    key: '_',
    value: function _(c, key) {
      this.input += c;
      this.complete(this.render);
      this.render();
    }
  }, {
    key: 'delete',
    value: function _delete() {
      if (this.input.length === 0) return this.bell();
      this.input = this.input.slice(0, -1);
      this.complete(this.render);
      this.render();
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
      this.moveCursor(this.suggestions.length - 1);
      this.render();
    }
  }, {
    key: 'up',
    value: function up() {
      if (this.cursor <= 0) return this.bell();
      this.moveCursor(this.cursor - 1);
      this.render();
    }
  }, {
    key: 'down',
    value: function down() {
      if (this.cursor >= this.suggestions.length - 1) return this.bell();
      this.moveCursor(this.cursor + 1);
      this.render();
    }
  }, {
    key: 'next',
    value: function next() {
      this.moveCursor((this.cursor + 1) % this.suggestions.length);
      this.render();
    }
  }, {
    key: 'render',
    value: function render(first) {
      var _this3 = this;

      if (first) this.out.write(cursor.hide);

      var prompt = [util.style.symbol(this.done, this.aborted), this.msg, util.style.delimiter(this.completing), this.done && this.suggestions[this.cursor] ? this.suggestions[this.cursor].title : this.transform.render(this.input)].join(' ');

      if (!this.done) {
        var suggestions = this.suggestions.map(function (item, i) {
          return '\n' + (i === _this3.cursor ? color.cyan(item.title) : item.title);
        });

        prompt += suggestions.length ? suggestions.reduce(function (acc, line) {
          return acc + line;
        }, '') : '\n' + color.gray(this.fallback);
      }

      this.out.write(this.clear + prompt);
      this.clear = util.clear(prompt);
    }
  }]);
  return AutocompletePrompt;
}(Prompt);

module.exports = AutocompletePrompt;