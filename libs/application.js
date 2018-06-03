
const Emitter = require('events');


module.exports = class Application extends Emitter {
  constructor({ pname,  template}){
    super();
    this.pname = pname;
    this.template = template;
  }

  async create(){
    console.log('create');
    return this;
  }
}

