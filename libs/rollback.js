

// npm run rollback -- --dir webpack-demo
// npm run seal -- --dir webpack-demo

const fs = require('fs-extra');
const parseArgs = require('minimist')(process.argv.slice(2));
const dir = parseArgs['dir'];
const seal = parseArgs['seal'];
const path = require('path');


if(dir){
  let pkg, _pkg;
  let dirPath = path.resolve(__dirname, '../templates', dir);
  let exist = fs.existsSync(dirPath);
  if(!exist){
    console.error(dir + 'is not exist : [' + dirPath + ']');
    process.exit(0);
  }

  pkg = path.resolve(dirPath, 'package.json');
  _pkg = path.resolve(dirPath, '_package.json');
  
  if(!seal){
    fs.renameSync(_pkg, pkg);
  }
  else {
    fs.renameSync(pkg, _pkg);
  }
}

