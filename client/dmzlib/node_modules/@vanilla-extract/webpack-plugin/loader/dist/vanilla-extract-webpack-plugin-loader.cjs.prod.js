'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var path = require('path');
var loaderUtils = require('loader-utils');
var integration = require('@vanilla-extract/integration');
var createDebug = require('debug');
var chalk = require('chalk');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var path__default = /*#__PURE__*/_interopDefault(path);
var loaderUtils__default = /*#__PURE__*/_interopDefault(loaderUtils);
var createDebug__default = /*#__PURE__*/_interopDefault(createDebug);
var chalk__default = /*#__PURE__*/_interopDefault(chalk);

const formatResourcePath = i => chalk__default["default"].blue(`"${i.replace(/.*\//, '')}"`);
createDebug__default["default"].formatters.r = r => formatResourcePath(r);
const debug = createDebug__default["default"];

const virtualFileLoader = require.resolve(path__default["default"].join(path__default["default"].dirname(require.resolve('../../package.json')), 'virtualFileLoader'));
const virtualFileLoaderExtractionFile = path__default["default"].join(path__default["default"].dirname(require.resolve('../../package.json')), 'extracted.js');
const virtualNextFileLoaderExtractionFile = path__default["default"].join(path__default["default"].dirname(require.resolve('../../package.json')), 'vanilla.virtual.css');
const defaultIdentifierOption = (mode, identifiers) => identifiers !== null && identifiers !== void 0 ? identifiers : mode === 'production' ? 'short' : 'debug';
function loader (source) {
  const {
    identifiers
  } = loaderUtils__default["default"].getOptions(this);
  const {
    name
  } = integration.getPackageInfo(this.rootContext);
  const callback = this.async();
  integration.transform({
    source,
    filePath: this.resourcePath,
    rootPath: this.rootContext,
    packageName: name,
    identOption: defaultIdentifierOption(this.mode, identifiers)
  }).then(code => {
    callback(null, code);
  }).catch(e => {
    callback(e);
  });
}
function pitch() {
  const {
    childCompiler,
    outputCss,
    identifiers,
    virtualLoader
  } = loaderUtils__default["default"].getOptions(this);
  const log = debug(`vanilla-extract:loader:${formatResourcePath(this.resourcePath)}`);
  const compiler = this._compiler;
  const isChildCompiler = childCompiler.isChildCompiler(compiler.name);
  if (isChildCompiler) {
    log('Skip vanilla-extract loader as we are already within a child compiler for %s', compiler.options.output.filename);
    return;
  }
  log('Loading file');
  const callback = this.async();
  childCompiler.getCompiledSource(this).then(async ({
    source
  }) => {
    const result = await integration.processVanillaFile({
      source,
      outputCss,
      filePath: this.resourcePath,
      identOption: defaultIdentifierOption(this.mode, identifiers),
      serializeVirtualCssPath: async ({
        fileName,
        source
      }) => {
        const serializedCss = await integration.serializeCss(source);
        if (virtualLoader === 'virtualFileLoader') {
          const virtualResourceLoader = `${virtualFileLoader}?${JSON.stringify({
            fileName,
            source: serializedCss
          })}`;
          const request = loaderUtils__default["default"].stringifyRequest(this, `${fileName}!=!${virtualResourceLoader}!${virtualFileLoaderExtractionFile}`);
          return `import ${request}`;
        } else {
          // https://github.com/SukkaW/style9-webpack/blob/f51c46bbcd95ea3b988d3559c3b35cc056874366/src/next-appdir/style9-next-loader.ts#L64-L72
          const request = loaderUtils__default["default"].stringifyRequest(this,
          // Next.js RSC CSS extraction will discard any loaders in the request.
          // So we need to pass virtual css information through resourceQuery.
          // https://github.com/vercel/next.js/blob/3a9bfe60d228fc2fd8fe65b76d49a0d21df4ecc7/packages/next/src/build/webpack/plugins/flight-client-entry-plugin.ts#L425-L429
          // The compressed serialized CSS of vanilla-extract will add compressionFlag.
          // Causing the resourceQuery to be abnormally split, so uri encoding is required.
          // https://github.com/vanilla-extract-css/vanilla-extract/blob/58005eb5e7456cf2b3c04ea7aef29677db37cc3c/packages/integration/src/serialize.ts#L15
          `${virtualNextFileLoaderExtractionFile}?${encodeURIComponent(JSON.stringify({
            fileName,
            source: serializedCss
          }))}`);
          return `import ${request}`;
        }
      }
    });
    log('Completed successfully');
    callback(null, result);
  }).catch(e => {
    callback(e);
  });
}

exports["default"] = loader;
exports.pitch = pitch;
