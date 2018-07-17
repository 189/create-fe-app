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

var readline = require('readline');

var _require = require('../util'),
    action = _require.action;

var EventEmitter = require('events');

var _require2 = require('sisteransi'),
    beep = _require2.beep,
    cursor = _require2.cursor;

/**
 * Base prompt skeleton
 */


var Prompt = function (_EventEmitter) {
  (0, _inherits3.default)(Prompt, _EventEmitter);

  function Prompt() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Prompt);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Prompt.__proto__ || Object.getPrototypeOf(Prompt)).call(this));

    _this.in = opts.in || process.stdin;
    _this.out = opts.out || process.stdout;

    var rl = readline.createInterface(_this.in);
    readline.emitKeypressEvents(_this.in, rl);

    if (_this.in.isTTY) _this.in.setRawMode(true);

    var keypress = function keypress(str, key) {
      var a = action(key);
      if (a === false) {
        _this._ && _this._(str, key);
      } else if (typeof _this[a] === 'function') {
        _this[a](key);
      } else {
        _this.bell();
      }
    };

    var close = function close() {
      _this.out.write(cursor.show);
      _this.in.removeListener('keypress', keypress);
      _this.in.setRawMode(false);
      rl.close();
      _this.emit(_this.aborted ? 'abort' : 'submit', _this.value);
    };
    _this.close = close;

    _this.in.on('keypress', keypress);
    return _this;
  }

  (0, _createClass3.default)(Prompt, [{
    key: 'fire',
    value: function fire() {
      this.emit('state', {
        value: this.value,
        aborted: !!this.aborted
      });
    }
  }, {
    key: 'bell',
    value: function bell() {
      this.out.write(beep);
    }
  }]);
  return Prompt;
}(EventEmitter);

module.exports = Prompt;