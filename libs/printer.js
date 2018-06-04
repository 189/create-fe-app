

const chalk = require('chalk');
const { pad }  = require('./utils');

module.exports = {
  trace(type = 'create', log){
    console.log(`${pad(1)}${chalk.cyan(type)}: ${log}`);
  },

  printInfo({title = '', body = []}){
    console.log();
    console.log(pad(1) + title);
    body.forEach(log => {
      console.log(pad(2) + chalk.cyan(log));
    });
    console.log();
  },

  warn(log){
    console.log(pad(1) + chalk.red(log));
  }
};




