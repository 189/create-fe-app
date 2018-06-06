'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 * Prompt for a series of questions
 * @param {Array|Object} questions Single question object or Array of question objects
 * @returns {Object} Object with values from user input
 */
var prompt = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var questions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref2$onSubmit = _ref2.onSubmit,
        onSubmit = _ref2$onSubmit === undefined ? noop : _ref2$onSubmit,
        _ref2$onCancel = _ref2.onCancel,
        onCancel = _ref2$onCancel === undefined ? noop : _ref2$onCancel;

    var answers, answer, question, quit, name, type, MAP, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _question, key, value, _question2;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            answers = {};

            questions = [].concat(questions);
            answer = void 0, question = void 0, quit = void 0, name = void 0, type = void 0;
            MAP = prompt._map || {};
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 7;
            _iterator = questions[Symbol.iterator]();

          case 9:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 66;
              break;
            }

            question = _step.value;
            _question = question;
            name = _question.name;
            type = _question.type;

            if (!(MAP[name] !== void 0)) {
              _context.next = 18;
              break;
            }

            answers[name] = MAP[name];
            delete MAP[name];
            return _context.abrupt('continue', 63);

          case 18:
            _context.t0 = _regenerator2.default.keys(question);

          case 19:
            if ((_context.t1 = _context.t0()).done) {
              _context.next = 34;
              break;
            }

            key = _context.t1.value;

            if (!ignore.includes(key)) {
              _context.next = 23;
              break;
            }

            return _context.abrupt('continue', 19);

          case 23:
            value = question[key];

            if (!(typeof value === 'function')) {
              _context.next = 30;
              break;
            }

            _context.next = 27;
            return value(answer, answers, question);

          case 27:
            _context.t2 = _context.sent;
            _context.next = 31;
            break;

          case 30:
            _context.t2 = value;

          case 31:
            question[key] = _context.t2;
            _context.next = 19;
            break;

          case 34:
            if (!(typeof question.message !== 'string')) {
              _context.next = 36;
              break;
            }

            throw new Error('prompt message is required');

          case 36:

            // skip if type is a falsy value
            _question2 = question;
            name = _question2.name;
            type = _question2.type;

            if (type) {
              _context.next = 41;
              break;
            }

            return _context.abrupt('continue', 63);

          case 41:
            if (!(prompts[type] === void 0)) {
              _context.next = 43;
              break;
            }

            throw new Error('prompt type (' + type + ') is not defined');

          case 43:
            _context.prev = 43;
            _context.next = 46;
            return prompts[type](question);

          case 46:
            answer = _context.sent;

            if (!question.format) {
              _context.next = 53;
              break;
            }

            _context.next = 50;
            return question.format(answer, answers);

          case 50:
            _context.t3 = _context.sent;
            _context.next = 54;
            break;

          case 53:
            _context.t3 = answer;

          case 54:
            answers[name] = answer = _context.t3;

            quit = onSubmit(question, answer);
            _context.next = 61;
            break;

          case 58:
            _context.prev = 58;
            _context.t4 = _context['catch'](43);

            quit = !onCancel(question);

          case 61:
            if (!quit) {
              _context.next = 63;
              break;
            }

            return _context.abrupt('return', answers);

          case 63:
            _iteratorNormalCompletion = true;
            _context.next = 9;
            break;

          case 66:
            _context.next = 72;
            break;

          case 68:
            _context.prev = 68;
            _context.t5 = _context['catch'](7);
            _didIteratorError = true;
            _iteratorError = _context.t5;

          case 72:
            _context.prev = 72;
            _context.prev = 73;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 75:
            _context.prev = 75;

            if (!_didIteratorError) {
              _context.next = 78;
              break;
            }

            throw _iteratorError;

          case 78:
            return _context.finish(75);

          case 79:
            return _context.finish(72);

          case 80:
            return _context.abrupt('return', answers);

          case 81:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[7, 68, 72, 80], [43, 58], [73,, 75, 79]]);
  }));

  return function prompt() {
    return _ref.apply(this, arguments);
  };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prompts = require('./prompts');

var ignore = ['suggest', 'format', 'onState'];
var noop = function noop() {};

function inject(obj) {
  prompt._map = prompt._map || {};
  for (var k in obj) {
    prompt._map[k] = obj[k];
  }
}

module.exports = Object.assign(prompt, { prompt: prompt, prompts: prompts, inject: inject });