'use strict';

var $ = exports;
var el = require('./elements');
var noop = function noop(v) {
  return v;
};

function toPrompt(type, args) {
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return new Promise(function (res, rej) {
    var p = new el[type](args);
    var onAbort = opts.onAbort || noop;
    var onSubmit = opts.onSubmit || noop;
    p.on('state', args.onState || noop);
    p.on('submit', function (x) {
      return res(onSubmit(x));
    });
    p.on('abort', function (x) {
      return rej(onAbort(x));
    });
  });
}

/**
 * Text prompt
 * @param {string} args.message Prompt message to display
 * @param {string} [args.initial] Default string value
 * @param {string} [args.style="default"] Render style ('default', 'password', 'invisible')
 * @param {function} [args.onState] On state change callback
 * @returns {Promise} Promise with user input
 */
$.text = function (args) {
  return toPrompt('TextPrompt', args);
};

/**
 * Password prompt with masked input
 * @param {string} args.message Prompt message to display
 * @param {string} [args.initial] Default string value
 * @param {function} [args.onState] On state change callback
 * @returns {Promise} Promise with user input
 *
 */
$.password = function (args) {
  args.style = 'password';
  return $.text(args);
};

/**
 * Prompt where input is invisible, like sudo
 * @param {string} args.message Prompt message to display
 * @param {string} [args.initial] Default string value
 * @param {function} [args.onState] On state change callback
 * @returns {Promise} Promise with user input
 */
$.invisible = function (args) {
  args.style = 'invisible';
  return $.text(args);
};

/**
 * Number prompt
 * @param {string} args.message Prompt message to display
 * @param {number} args.initial Default number value
 * @param {function} [args.onState] On state change callback
 * @param {number} [args.max] Max value
 * @param {number} [args.min] Min value
 * @param {string} [args.style="default"] Render style ('default', 'password', 'invisible')
 * @param {Boolean} [opts.float=false] Parse input as floats
 * @param {Number} [opts.round=2] Round floats to x decimals
 * @param {Number} [opts.increment=1] Number to increment by when using arrow-keys
 * @returns {Promise} Promise with user input
 */
$.number = function (args) {
  return toPrompt('NumberPrompt', args);
};

/**
 * Classic yes/no prompt
 * @param {string} args.message Prompt message to display
 * @param {boolean} [args.initial=false] Default value
 * @param {function} [args.onState] On state change callback
 * @returns {Promise} Promise with user input
 */
$.confirm = function (args) {
  return toPrompt('ConfirmPrompt', args);
};

/**
 * List prompt, split intput string by `seperator`
 * @param {string} args.message Prompt message to display
 * @param {string} [args.initial] Default string value
 * @param {string} [args.style="default"] Render style ('default', 'password', 'invisible')
 * @param {string} [args.separator] String separator
 * @param {function} [args.onState] On state change callback
 * @returns {Promise} Promise with user input, in form of an `Array`
 */
$.list = function (args) {
  var sep = args.separator || ',';
  return toPrompt('TextPrompt', args, {
    onSubmit: function onSubmit(str) {
      return str.split(sep).map(function (s) {
        return s.trim();
      });
    }
  });
};

/**
 * Toggle/switch prompt
 * @param {string} args.message Prompt message to display
 * @param {boolean} [args.initial=false] Default value
 * @param {string} [args.active="on"] Text for `active` state
 * @param {string} [args.inactive="off"] Text for `inactive` state
 * @param {function} [args.onState] On state change callback
 * @returns {Promise} Promise with user input
 */
$.toggle = function (args) {
  return toPrompt('TogglePrompt', args);
};

/**
 * Interactive select prompt
 * @param {string} args.message Prompt message to display
 * @param {Array} args.choices Array of choices objects `[{ title, value }, ...]`
 * @param {number} [args.initial] Index of default value
 * @param {String} [args.hint] Hint to display
 * @param {function} [args.onState] On state change callback
 * @returns {Promise} Promise with user input
 */
$.select = function (args) {
  return toPrompt('SelectPrompt', args);
};

/**
 * Interactive multi-select prompt
 * @param {string} args.message Prompt message to display
 * @param {Array} args.choices Array of choices objects `[{ title, value, [selected] }, ...]`
 * @param {number} [args.max] Max select
 * @param {string} [args.hint] Hint to display user
 * @param {Number} [args.cursor=0] Cursor start position
 * @param {function} [args.onState] On state change callback
 * @returns {Promise} Promise with user input
 */
$.multiselect = function (args) {
  args.choices = [].concat(args.choices || []);
  var toSelected = function toSelected(items) {
    return items.filter(function (item) {
      return item.selected;
    }).map(function (item) {
      return item.value;
    });
  };
  return toPrompt('MultiselectPrompt', args, {
    onAbort: toSelected,
    onSubmit: toSelected
  });
};

var byTitle = function byTitle(input, choices) {
  return Promise.resolve(choices.filter(function (item) {
    return item.title.slice(0, input.length).toLowerCase() === input.toLowerCase();
  }));
};

/**
 * Interactive auto-complete prompt
 * @param {string} args.message Prompt message to display
 * @param {Array} args.choices Array of auto-complete choices objects `[{ title, value }, ...]`
 * @param {Function} [args.suggest] Function to filter results based on user input. Defaults to sort by `title`
 * @param {number} [args.limit=10] Max number of results to show
 * @param {string} [args.style="default"] Render style ('default', 'password', 'invisible')
 * @param {String} [args.initial] Index of the default value
 * @param {String} [args.fallback] Fallback message - defaults to initial value
 * @param {function} [args.onState] On state change callback
 * @returns {Promise} Promise with user input
 */
$.autocomplete = function (args) {
  args.suggest = args.suggest || byTitle;
  args.choices = [].concat(args.choices || []);
  return toPrompt('AutocompletePrompt', args);
};