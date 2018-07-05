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
    cursor = _require.cursor;

var _require2 = require('../util'),
    clear = _require2.clear,
    figures = _require2.figures,
    style = _require2.style;

/**
 * MultiselectPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Array} opts.choices Array of choice objects
 * @param {String} [opts.hint] Hint to display
 * @param {Number} [opts.cursor=0] Cursor start position
 * @param {Number} [opts.max] Max choices
 */


var MultiselectPrompt = function (_Prompt) {
  (0, _inherits3.default)(MultiselectPrompt, _Prompt);

  function MultiselectPrompt() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, MultiselectPrompt);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MultiselectPrompt.__proto__ || Object.getPrototypeOf(MultiselectPrompt)).call(this, opts));

    _this.msg = opts.message;
    _this.cursor = opts.cursor || 0;
    _this.hint = opts.hint || '- Space to select. Return to submit';
    _this.maxChoices = opts.max;
    _this.value = opts.choices.map(function (v) {
      return Object.assign({ title: v.value, selected: false }, v);
    });
    _this.clear = clear('');
    _this.render(true);
    return _this;
  }

  (0, _createClass3.default)(MultiselectPrompt, [{
    key: 'reset',
    value: function reset() {
      this.value.map(function (v) {
        return !v.selected;
      });
      this.cursor = 0;
      this.fire();
      this.render();
    }
  }, {
    key: 'selected',
    value: function selected() {
      return this.value.filter(function (v) {
        return v.selected;
      });
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
      this.cursor = 0;
      this.render();
    }
  }, {
    key: 'last',
    value: function last() {
      this.cursor = this.value.length - 1;
      this.render();
    }
  }, {
    key: 'next',
    value: function next() {
      this.cursor = (this.cursor + 1) % this.value.length;
      this.render();
    }
  }, {
    key: 'up',
    value: function up() {
      if (this.cursor === 0) return this.bell();
      this.cursor--;
      this.render();
    }
  }, {
    key: 'down',
    value: function down() {
      if (this.cursor === this.value.length - 1) return this.bell();
      this.cursor++;
      this.render();
    }
  }, {
    key: 'left',
    value: function left() {
      this.value[this.cursor].selected = false;
      this.render();
    }
  }, {
    key: 'right',
    value: function right() {
      if (this.value.filter(function (e) {
        return e.selected;
      }).length >= this.maxChoices) return this.bell();
      this.value[this.cursor].selected = true;
      this.render();
    }
  }, {
    key: '_',
    value: function _(c, key) {
      if (c !== ' ') return this.bell();
      var v = this.value[this.cursor];

      if (v.selected) {
        v.selected = false;
        this.render();
      } else if (this.value.filter(function (e) {
        return e.selected;
      }).length >= this.maxChoices) {
        return this.bell();
      } else {
        v.selected = true;
        this.render();
      }
    }
  }, {
    key: 'render',
    value: function render(first) {
      if (first) this.out.write(cursor.hide);

      // print prompt
      var selected = this.value.filter(function (e) {
        return e.selected;
      }).map(function (v) {
        return v.title;
      }).join(', ');
      var prompt = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(false), this.done ? selected : color.gray(this.hint)].join(' ');

      // print choices
      if (!this.done) {
        var c = this.cursor;
        prompt += '\n' + this.value.map(function (v, i) {
          return (v.selected ? color.green(figures.tick) : ' ') + ' ' + (c === i ? color.cyan.underline(v.title) : v.title);
        }).join('\n');
      }

      this.out.write(this.clear + prompt);
      this.clear = clear(prompt);
    }
  }]);
  return MultiselectPrompt;
}(Prompt);

module.exports = MultiselectPrompt;