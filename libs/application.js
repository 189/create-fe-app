
const Emitter = require('events');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const prompts = require('prompts');
const { trace, printInfo, warn } = require('./printer');
const cwd = process.cwd();

module.exports = class Application extends Emitter {
  constructor({ pname,  template, fullPath, dest}){
    super();
    this.pname = pname;
    this.template = template;
    this.fullPath = fullPath;
    this.dest = path.join(cwd, this.pname);
  }

  async create(){
    try {
      // check if the folder has been exist
      const exists = await fs.pathExists(this.dest);
      if(exists){
        const question = [{
          type : "confirm",
          name : 'cover',
          message : `The folder name ${chalk.red(this.pname)} has been exists, overwrite ? `,
          initial : true
        }];
        const answer = await prompts(question);
        if(!answer.cover){
          trace('Abort', 'You have abort this task');
          return;
        }
        // Flush all files in folder
        await fs.emptyDir(this.dest);
        trace('Flush', this.pname + ' has been flush');
      }
      else {
        // make folder
        await fs.ensureDir(this.dest);
      }
      // copy template
      await fs.copy(this.fullPath, this.dest, {overwrite : true});
      trace('Initial', 'Initialize project successfully!');
    }
    catch(ex) {
      console.error(ex);
    }
    // console.log('create', this.pname, this.template, this.fullPath, cwd);
    return this;
  }

}

