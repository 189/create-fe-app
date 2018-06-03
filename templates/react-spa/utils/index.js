const fs = require('fs');
const pm = {};
const util = require('util');

['writeFile'].forEach(api => {
  pm[api] = util.promisify(fs[api]);
})

module.exports = {
  writeFile(path, data){
    return pm.writeFile(path, data);
  }
};




