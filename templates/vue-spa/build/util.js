const path =  require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const isProd = process.env.NODE_ENV === "production";

let cssLoaders, styleLoaders;

function pad(n) {
    return n < 10 ? "0" + n.toString(10) : n.toString(10);
}

function timestamp() {
    var d = new Date();
    var time = [
        pad(d.getHours()),
        pad(d.getMinutes()),
        pad(d.getSeconds())
    ].join(":");
    return `[${time}]`;
}

function resolve(...dirs) {
    return path.join(__dirname, "..", ...dirs);
}

exports.timestamp = timestamp;
exports.resolve = resolve;
exports.cssLoaders = cssLoaders = function(options = {}) {
    const sourceMap = options.sourceMap || false;
    const minimize = options.minimize || false;
    options = options || {};
    var cssLoader = {
        loader: "css-loader",
        options: {
            minimize,
            sourceMap
        }
    };

    // generate loader string to be used with extract text plugin
    function generateLoaders(loader, loaderOptions) {
        var loaders = [cssLoader];
        if (loader) {
            loaders.push({
                loader: loader + "-loader",
                options: Object.assign({}, loaderOptions, {
                    sourceMap
                })
            });
        }

        // Extract CSS when that option is specified
        // (which is the case during production build)
        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: "vue-style-loader"
            });
        } else {
            return ["vue-style-loader"].concat(loaders);
        }
    }

    // https://vue-loader.vuejs.org/en/configurations/extract-css.html
    return {
        css: generateLoaders(),
        sass: generateLoaders("sass", { indentedSyntax: false }),
        less : generateLoaders("less", {}),
        scss: generateLoaders("sass")
    };
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = styleLoaders = function (options = {}) {
    var output = [];
    //exports.cssLoaders ===cssLoaders :true
    var loaders = cssLoaders(options);
    var index = options.extract === true ? 3 : 2;
    for (var extension in loaders) {
        var loader = loaders[extension];
        output.push({
            test: new RegExp("\\." + extension + "$"),
            //在index:2位置插入'postcss-loader'
            use: (loader.splice(index, 0, "postcss-loader"), loader)
        });
    }
    return output;
}

exports.isProd = isProd ;