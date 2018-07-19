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

var Emitter = require('events');
var fs = require('fs-extra');
var path = require('path');
var chalk = require('chalk');
var prompts = require('./prompts-core');
var utils = require('./utils');
var ejs = require('ejs');

var _require = require('./printer'),
    trace = _require.trace,
    printInfo = _require.printInfo,
    warn = _require.warn,
    guide = _require.guide,
    makeEmptyLine = _require.makeEmptyLine;

var cwd = process.cwd();
var exclude = ['_package.json', 'debug.json'];

module.exports = function (_Emitter) {
  (0, _inherits3.default)(Application, _Emitter);

  function Application(_ref) {
    var pname = _ref.pname,
        template = _ref.template,
        fullPath = _ref.fullPath,
        dest = _ref.dest;
    (0, _classCallCheck3.default)(this, Application);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Application.__proto__ || Object.getPrototypeOf(Application)).call(this));

    _this.pname = pname;
    _this.template = template;
    _this.fullPath = fullPath;
    _this.dest = path.join(cwd, _this.pname);
    return _this;
  }

  (0, _createClass3.default)(Application, [{
    key: 'create',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var exists, question, answer;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return fs.pathExists(this.dest);

              case 3:
                exists = _context.sent;

                if (!exists) {
                  _context.next = 18;
                  break;
                }

                question = [{
                  type: "confirm",
                  name: 'cover',
                  message: 'The folder name ' + chalk.red(this.pname) + ' has been exists, overwrite ? ',
                  initial: true
                }];
                _context.next = 8;
                return prompts(question);

              case 8:
                answer = _context.sent;

                makeEmptyLine();

                if (answer.cover) {
                  _context.next = 13;
                  break;
                }

                trace('Abort', 'You have abort this task');
                return _context.abrupt('return');

              case 13:
                _context.next = 15;
                return fs.emptyDir(this.dest);

              case 15:
                trace('Flush', this.pname + ' has been flush');
                _context.next = 20;
                break;

              case 18:
                _context.next = 20;
                return fs.ensureDir(this.dest);

              case 20:
                _context.next = 22;
                return fs.copy(this.fullPath, this.dest, {
                  overwrite: true,
                  filter: function filter(src, dest) {
                    return exclude.indexOf(path.basename(src)) === -1;
                  }
                });

              case 22:
                trace('Copy', 'Copy ' + this.template + ' to ' + this.pname);
                this.makePkg();
                trace('Create', 'create package.json');
                this.makeGitIgnore();
                trace('Create', 'create .gitignore');
                trace('Initialize', 'Finish');
                guide(this.pname, this.pkg.scripts);
                _context.next = 34;
                break;

              case 31:
                _context.prev = 31;
                _context.t0 = _context['catch'](0);

                console.error(_context.t0);

              case 34:
                return _context.abrupt('return', this);

              case 35:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 31]]);
      }));

      function create() {
        return _ref2.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: 'makePkg',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var pkgStr, pkgPath, content;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                pkgStr = JSON.stringify(this.pkg);
                pkgPath = path.join(this.dest, 'package.json');
                content = ejs.render(pkgStr, { name: this.pname });
                _context2.next = 5;
                return utils.writeFile(pkgPath, this.toJSONStr(content));

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function makePkg() {
        return _ref3.apply(this, arguments);
      }

      return makePkg;
    }()
  }, {
    key: 'makeGitIgnore',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
        var ignorePath, exist;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                ignorePath = path.resolve(this.dest, '.gitignore');
                _context3.next = 3;
                return fs.ensureFile(ignorePath);

              case 3:
                exist = _context3.sent;

                if (exist) {
                  _context3.next = 7;
                  break;
                }

                _context3.next = 7;
                return fs.copy(path.resolve(cwd, ".gitignore"), ignorePath);

              case 7:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function makeGitIgnore() {
        return _ref4.apply(this, arguments);
      }

      return makeGitIgnore;
    }()
  }, {
    key: 'toJSONStr',
    value: function toJSONStr(json) {
      json = JSON.parse(json);
      return JSON.stringify(json, null, 4);
    }
  }, {
    key: 'pkg',
    get: function get() {
      return require(path.join(this.fullPath, '_package.json'));
    }
  }]);
  return Application;
}(Emitter);