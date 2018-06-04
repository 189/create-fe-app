
const Emitter = require('events');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const prompts = require('prompts');
const utils = require('./utils');
const ejs = require('ejs');
const { trace, printInfo, warn, guide, empty } = require('./printer');
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
        empty();
        if(!answer.cover){
          trace('Abort', 'You have abort this task');
          return;
        }
        // Flush all files in folder
        await fs.emptyDir(this.dest);
        trace('Flush', this.pname + ' has been flush');
      }
      else {
        await fs.ensureDir(this.dest);
      }
      
      // copy template
      await fs.copy(this.fullPath, this.dest, {
        overwrite : true,
        filter(src, dest){
          return path.basename(src) !== '_package.json';
        }
      });
      trace('Copy', `Copy ${this.template} to ${this.pname}`);
      this.makePkg();
      trace('Create', 'Create package.json');
      trace('Initialize', 'Initialize done, have fun');
      guide(this.pname, this.pkg.scripts);
    }
    catch(ex) {
      console.error(ex);
    }
    // console.log('create', this.pname, this.template, this.fullPath, cwd);
    return this;
  }

  get pkg(){
    return require(path.join(this.fullPath, '_package.json'))
  }

  async makePkg(){
    const pkgStr = JSON.stringify(this.pkg);
    const pkgPath = path.join(this.dest, 'package.json');
    const content = ejs.render(pkgStr, { name : this.pname });
    await utils.writeFile(pkgPath, this.toJSONStr(content));
  }

  toJSONStr(json){
    json = JSON.parse(json);
    return JSON.stringify(json, null, 4);
  }
}

