'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./vanilla-extract-webpack-plugin-next.cjs.prod.js");
} else {
  module.exports = require("./vanilla-extract-webpack-plugin-next.cjs.dev.js");
}
