'use strict';

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var strip = require('./strip');

var _require = require('sisteransi'),
    erase = _require.erase,
    cursor = _require.cursor;

var width = function width(str) {
  return [].concat((0, _toConsumableArray3.default)(strip(str))).length;
};

module.exports = function (prompt) {
  var perLine = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : process.stdout.columns;

  if (!perLine) return erase.line + cursor.to(0);

  var rows = 0;
  var lines = prompt.split(/\r?\n/);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = lines[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var line = _step.value;

      rows += 1 + Math.floor(Math.max(width(line) - 1, 0) / perLine);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return (erase.line + cursor.prevLine()).repeat(rows - 1) + erase.line + cursor.to(0);
};