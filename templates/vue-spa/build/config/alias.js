const path = require("path");
const { resolve } = require("../util");

const alias = {
    "global": resolve("src/global"), 
    "@": resolve("src"),
    "common": resolve("src", "global/common")
};

Object.keys(alias).forEach(name => (alias[name] = path.resolve(alias[name])));

module.exports = alias;




