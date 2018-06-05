

const chalk = require('chalk');
const { pad, launchedFromCmd }  = require('./utils');
const prompt = launchedFromCmd() ? '>' : '$';
const max = 8;
const {keys} = Object;

module.exports = {
  makeEmptyLine(){
    console.log();
  },

  trace(type = 'create', log){
    const word = type.padEnd(max, ' ');
    console.log(`${pad(1)}${chalk.cyan('√ ' + word)}: ${log}`);
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
  },

  guide(pname, scripts){
    console.log();
    console.log(pad(1) + 'install dependencies:');
    console.log(pad(2) + '%s cd %s && npm install', prompt, pname);
    console.log();
    console.log(pad(1) + 'run the app:');
    keys(scripts).forEach(script => {
      if(script !== 'test'){
        console.log(`${pad(2)}${prompt} npm run ${script} : ${scripts[script]}`);
      }
    })
  }
};




