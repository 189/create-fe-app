const koa = require("koa");
const ip = require("ip");
const chalk = require("chalk");
const path = require("path");
const webpack = require("webpack");
const { hotMiddleware, devMiddleware } = require("koa-webpack-middleware");
const history = require("../plugins/historyApiFallback");

const config = require("../../config");
const webpackConfig = require("../webpack.config.dev");

const hotclient = ['eventsource-polyfill', 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'];
const entry = webpackConfig.entry;

//把热加载配置插入到每个entry
Object.keys(entry).forEach(name => {
  const value = entry[name];
  if (Array.isArray(value)) {
    value.unshift(...hotclient);
  } else {
    entry[name] = [...hotclient, value];
  }
});

const compiler = webpack(webpackConfig);

const devMw = devMiddleware(compiler, {
  // serverSideRender: true,
  publicPath: compiler.options.output.publicPath,
  //`quiet: true` display nothing to the console
  quiet: false,
  // `noInfo:true` display no info to console (only warnings and errors)
  noInfo: true,
  // that means no watching, but recompilation on every request
  lazy: false,
  // watch options (only lazy: false)
  watchOptions: {
    aggregateTimeout: 300,
    poll: true
  },
  stats: {
    colors: true,
    hash: true,
    version: false,
    timings: false,
    assets: false,
    chunks: false,
    children: false,
    chunkModules: false,
    modules: false,
    // Add details to errors (like resolving log)
    errorDetails: true
  }
});

const hotMw = hotMiddleware(compiler, { log: false });

const historyMiddleWare = history({
  verbose: false,
  // Disables the dot rule mentioned above:
  disableDotRule: false,
  exclude: /^\/mock(?:\/.*)+/ //排除mock api url请求
});

const app = new koa();

// middleware
app.use(historyMiddleWare);
app.use(devMw);
app.use(hotMw);

// serving a favicon
app.listen(config.devServerPort, function() {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  console.log(
    `dev-server at ${chalk.magenta.underline(
      `http://localhost:${this.address().port}/`
    )}`
  );
});

