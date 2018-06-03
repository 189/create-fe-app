const history = require("./connect-history-api-fallback");
const url = require("url");

module.exports = function(options){
    const h = history(options);
    return async function historyAPIFallback (ctx, next) {
        const { exclude } = options;
        const { req } = ctx;
        const { pathname } = url.parse(ctx.req.url);
        if (exclude && exclude.test(pathname)) {
            console.warn(
                `Not rewriting ${req.method} ${req.url} bescause  match the exclude rule:${exclude}`
            );
            return next();
        }
        await h(ctx.req, ctx.res, next);
    };
}  