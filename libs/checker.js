

const {versions, exit} = process;

module.exports = {
  version(){
    if(parseFloat(versions.node) < 8.6){
      console.error(`
        The cli require node version ≥ v8.6 for object rest/spread property  \n
        Please update your node version
      `
      );
      exit(0);
    }
  }
};


