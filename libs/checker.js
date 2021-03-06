

const {versions, exit} = process;
const versionCompare = require('./utils').versionCompare;

module.exports = {
  version(){
    // console.log(parseFloat(versions.node));
    // exit(0);
    if( versionCompare(versions.node, 8.6) === -1){
      console.error(`
        Version is ${versions.node} \n
        Your current version is ${parseFloat(versions.node)}\n
        The cli require node version ≥ v8.6 for object rest/spread property  \n
        Please update your node version
      `
      );
      exit(0);
    }
  }
};


