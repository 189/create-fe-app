

// npm run restore -- --dir dirname --...

const fs = require('fs-extra');
const parseArgs = require('minimist')(process.argv.slice(2));
const dir = parseArgs['dir'];
const path = require('path');

if(dir){
  const dirPath = path.resolve(__dirname, '../templates', dir);
  const exist = fs.existsSync(dirPath);
  if(!exist){
    console.error(dir + 'is not exist : [' + dirPath + ']');
    process.exit(0);
  }
  const pkg = path.resolve(dirPath, 'package.json');
  const _pkg = path.resolve(dirPath, '_package.json');
  fs.renameSync(pkg, _pkg);
}

