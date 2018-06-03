const { injectBabelPlugin, loaderNameMatches, getLoader } = require('react-app-rewired');
const createRewireSass = require('./utils/rewireSass');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const rewireLess = require('react-app-rewire-less');
const theme = require('./public/antdTheme');
const utils = require('./utils');


module.exports = function override(config, env) {
  config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);

  config = rewireLess.withLoaderOptions({
    modifyVars: theme,
    sourceMap : false
  })(config, env);
  
  config = createRewireSass({
    includePaths : ['src/**/*'],
    sourceMap: false
  })(config, env);
  
  utils.writeFile('./debug.json', JSON.stringify(config, null, 4)).then(()=> console.log('[debug]:ok'));
  return config;
};

// const urlLoader = function (conf) {
//   return conf.loader === 'url';
// };

// function rewireSass(config, env) {
//   config.module.loaders.find(urlLoader).exclude.push(/\.scss$/);
//   config.module.loaders.push({
//     test: /\.scss$/,
//     loader: (env === 'development')
//       ? 'style!css!sass'
//       : ExtractTextPlugin.extract('style', 'css!sass')
//   });
//   return config;
// }
