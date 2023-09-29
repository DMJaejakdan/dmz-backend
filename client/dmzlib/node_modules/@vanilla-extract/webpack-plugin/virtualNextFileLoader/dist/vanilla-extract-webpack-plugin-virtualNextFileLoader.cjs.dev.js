'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var integration = require('@vanilla-extract/integration');

function virtualNextFileLoader () {
  const callback = this.async();
  const resourceQuery = this.resourceQuery.slice(1);
  try {
    const {
      source
    } = JSON.parse(decodeURIComponent(resourceQuery));
    integration.deserializeCss(source).then(deserializedCss => {
      callback(null, deserializedCss);
    }).catch(e => {
      callback(e);
    });
  } catch (e) {
    callback(e);
  }
}

exports["default"] = virtualNextFileLoader;
