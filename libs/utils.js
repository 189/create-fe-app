
const util = require('util');
const fs = require('fs');
const utils = {};
const methods = ['readdir', 'stat', 'writeFile', 'readFile'];

/**
 * Promisify
 */
methods.forEach(function(method){
  utils[method] = util.promisify(fs[method]);
})

/**
 * Determine if launched from cmd.exe
 */
function launchedFromCmd() {
  return process.platform === 'win32' && process.env._ === undefined;
}


/**
 * Compose data to {title:value}
 * @param {array} choices 
 */
function compose(choices){
  return choices.map( choose => ({ title : choose, value : choose }));
}

/**
 * Fill with space for indentation
 * @param {number} level 
 */
function pad(level){
  return ' '.repeat(level * 3)
}


function versionCompare(ver1, ver2){
  let v1 = ver1.toString().split('.');
  let v2 = ver2.toString().split('.');
  let max = Math.max(v1.length, v2.length);
  for(let i = 0; i < max; i++){
    v1[i] = typeof v1[i] === 'undefined' ? 0 : parseInt(v1[i]);
    v2[i] = typeof v2[i] === 'undefined' ? 0 : parseInt(v2[i]);
    if(v1[i] < v2[i]){
      return -1;
    }
    if(v1[i] > v2[i]){
      return 1;
    }
  }
  return 0;
}


module.exports = Object.assign(utils, {
  compose,
  pad,
  launchedFromCmd,
  versionCompare
});

