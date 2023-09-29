import { deserializeCss } from '@vanilla-extract/integration';

function virtualNextFileLoader () {
  const callback = this.async();
  const resourceQuery = this.resourceQuery.slice(1);
  try {
    const {
      source
    } = JSON.parse(decodeURIComponent(resourceQuery));
    deserializeCss(source).then(deserializedCss => {
      callback(null, deserializedCss);
    }).catch(e => {
      callback(e);
    });
  } catch (e) {
    callback(e);
  }
}

export { virtualNextFileLoader as default };
