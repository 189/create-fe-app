'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var start = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var tempListInfo, tempList, choices, question, _ref2, pname, template, app;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return collectTemplates();

          case 2:
            tempListInfo = _context.sent;
            tempList = keys(tempListInfo);
            choices = compose(tempList);
            question = [{
              name: 'pname',
              message: 'Your project name <Your folder name>:',
              type: 'text'
            }, {
              name: 'template',
              message: 'Which kind of applycation template you want:',
              type: 'select',
              initial: 0,
              choices: choices
            }];

            // cli

            if (!program.list) {
              _context.next = 9;
              break;
            }

            printInfo({
              title: "All templates you can use:",
              body: tempList
            });
            return _context.abrupt('return');

          case 9:
            if (!program.args.length) {
              _context.next = 12;
              break;
            }

            printInfo({
              title: 'You should excute cli without option or arguments just like:',
              body: ['create-fe-app']
            });
            return _context.abrupt('return');

          case 12:
            _context.next = 14;
            return prompts(question);

          case 14:
            _ref2 = _context.sent;
            pname = _ref2.pname;
            template = _ref2.template;

            if (!(pname.trim() === '')) {
              _context.next = 20;
              break;
            }

            throw new Error('Project name is requried');

          case 20:
            pname = pname || template;

            // Now create application
            app = new Application({
              pname: pname,
              template: template,
              fullPath: tempListInfo[template]
            });

            app.create().catch(function (ex) {
              return console.error(ex);
            });

          case 23:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function start() {
    return _ref.apply(this, arguments);
  };
}();

var collectTemplates = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
    var _this = this;

    var tempList, ret, stats;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return readdir(tempPath);

          case 2:
            tempList = _context3.sent;
            ret = [];
            stats = tempList.map(function () {
              var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(temp) {
                var fullPath, st;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        fullPath = path.join(tempPath, temp);
                        _context2.next = 3;
                        return stat(fullPath);

                      case 3:
                        st = _context2.sent;
                        return _context2.abrupt('return', assign(st, { fullPath: fullPath, temp: temp }));

                      case 5:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, _this);
              }));

              return function (_x) {
                return _ref4.apply(this, arguments);
              };
            }());
            _context3.next = 7;
            return Promise.all(stats);

          case 7:
            _context3.t0 = function (st) {
              if (st.isDirectory()) {
                ret[path.basename(st.temp)] = st.fullPath;
              }
            };

            _context3.sent.forEach(_context3.t0);

            return _context3.abrupt('return', ret);

          case 10:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function collectTemplates() {
    return _ref3.apply(this, arguments);
  };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var path = require('path');
var program = require('commander');
var os = require('os');
var chalk = require('chalk');
var prompts = require('./prompts-core');
var pkg = require('../package.json');

var _require = require('./utils'),
    readdir = _require.readdir,
    stat = _require.stat,
    compose = _require.compose;

var _require2 = require('./printer'),
    printInfo = _require2.printInfo;

var Application = require('./application');
var exit = process.exit;
var keys = Object.keys,
    values = Object.values,
    assign = Object.assign;


var eol = os.EOL;
var version = pkg.version;
var tempPath = path.resolve(__dirname, '../templates');

program.version(version).usage("  ").option('-l, --list', 'list all templates').parse(process.argv);

start().catch(function (ex) {
  return console.error(ex);
});