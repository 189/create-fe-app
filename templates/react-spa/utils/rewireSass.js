const { injectBabelPlugin, loaderNameMatches, getLoader } = require('react-app-rewired');

function createRewireSass(options = {}) {
  return function(config, env) {
    const ext = /\.scss$/;
    const fileLoader = getLoader(
      config.module.rules,
      rule => loaderNameMatches(rule, 'file-loader')
    );
    fileLoader.exclude.push(ext);

    const cssRules = getLoader(
      config.module.rules,
      rule => String(rule.test) === String(/\.css$/)
    );

    let rules;
    if (env === "production") {
      rules = {
        test: ext,
        loader: [
          ...cssRules.loader,
          { loader: "sass-loader", options: options }
        ]
      };
    } else {
      rules = {
        test: ext,
        use: [
          ...cssRules.use,
          { loader: "sass-loader", options: options }
        ]
      };
    }

    const oneOfRule = config.module.rules.find((rule) => rule.oneOf !== undefined);
    if (oneOfRule) {
      oneOfRule.oneOf.unshift(rules);
    }
    else {
      // Fallback to previous behaviour of adding to the end of the rules list.
      config.module.rules.push(rules);
    }

    return config;
  };
}

module.exports = createRewireSass;
