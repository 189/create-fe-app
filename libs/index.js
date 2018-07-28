
const fs = require('fs');
const path = require('path');
const program = require('commander');
const os = require('os');
const chalk = require('chalk');
const argvs = require('minimist')(process.argv.slice(2));
const prompts = require('prompts');
const pkg = require('../package.json');
const { readdir, stat, compose } = require('./utils');
const checker = require('./checker');
const { printInfo } = require('./printer');
const Application = require('./application');
const exit = process.exit;
const {keys, values, assign} = Object;

const eol = os.EOL;
const version = pkg.version;
const tempPath = path.resolve(__dirname, '../templates');

checker.version();

program.version(version)
    .usage("<Your_project_name>")
    .option('-l, --list', 'list all templates')
    .parse(process.argv);

async function start() {
  let tempListInfo = await collectTemplates(); 
  let tempList = keys(tempListInfo);
  let choices = compose(tempList);
  let pname = argvs._[0];
  let question = [
  // { 
  //   name : 'pname', 
  //   message : 'Your project name <Your folder name>:', 
  //   type : 'text'
  // },
  { 
    name : 'template', 
    message : 'Which kind of template do you want:', 
    type : 'select', 
    initial : 0,
    choices
  }];
  
  // cli
  if(program.list){
    printInfo({
      title : "All templates you can use:",
      body : tempList
    });
    return; 
  }

  // if(program.args.length){
  //   printInfo({
  //     title : 'You should excute cli without option or arguments just like:',
  //     body : ['create-fe-app']
  //   });
  //   return;
  // }

  let { template } = await prompts(question);
  // if(pname.trim() === ''){
  //   throw new Error('Project name is requried');
  //   return;
  // }

  // pname = pname || template;

  // Now create application
  const app = new Application({
    pname, 
    template,
    fullPath : tempListInfo[template]
  });
  app.create().catch(ex => console.error(ex));
}


async function collectTemplates(){
  let tempList = await readdir(tempPath), ret = [];
  let stats = tempList.map(async temp => {
    let fullPath = path.join(tempPath, temp);
    let st = await stat(fullPath);
    return assign(st, {fullPath, temp});
  });

  (await Promise.all(stats)).forEach(st => {
    if(st.isDirectory()){
      ret[path.basename(st.temp)] = st.fullPath;
    }
  });
  return ret;
}

start().catch(ex => console.error(ex));


// process.on('exit', (code) => {
//   console.log(`Bye ~`);
// });