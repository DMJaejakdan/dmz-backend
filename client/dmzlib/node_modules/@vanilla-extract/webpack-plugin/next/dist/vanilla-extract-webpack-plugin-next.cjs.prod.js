'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var path = require('path');
var plugin = require('../../dist/plugin-bbbe3abb.cjs.prod.js');
require('@vanilla-extract/integration');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var path__default = /*#__PURE__*/_interopDefault(path);

const virtualNextFileLoader = require.resolve(path__default["default"].join(path__default["default"].dirname(require.resolve('../../package.json')), 'virtualNextFileLoader'));
class VanillaExtractPlugin extends plugin.AbstractVanillaExtractPlugin {
  static loader = virtualNextFileLoader;
  apply(compiler) {
    this.inject(compiler, 'virtualNextFileLoader');
  }
}

exports.VanillaExtractPlugin = VanillaExtractPlugin;
