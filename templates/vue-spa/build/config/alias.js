const path = require("path");
const { resolve } = require("../util");

const alias = {
    "~": resolve("src"),
    "common": resolve("src/assets/common")
};

// Object.keys(alias).forEach(name => (alias[name] = path.resolve(alias[name])));

module.exports = alias;




