"use strict";

var _process = process,
    versions = _process.versions,
    exit = _process.exit;


module.exports = {
  version: function version() {
    if (parseFloat(versions.node) < 8.6) {
      console.error("\n        The cli require node version \u2265 v8.6 for object rest/spread property  \n\n        Please update your node version\n      ");
      exit(0);
    }
  }
};