
const Emitter = require('events');
const fse = require('fs-extra');
const path = require('path');
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
    await fse.ensureDir(this.dest);
    // console.log('create', this.pname, this.template, this.fullPath, cwd);
    return this;
  }
}

