const NextFederationPlugin = require('@module-federation/nextjs-mf');
const { default: pages } = require('./pages');

module.exports = {
  webpack(config, options) {
    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'map',
          filename: 'static/chunks/remoteEntry.js',
          remotes: {
            dmzlib:
              'dmzlib@http://localhost:3001/_next/static/chunks/remoteEntry.js',
          },
          exposes: {
            './Map': './map/MapFrame.jsx',
          },
        })
      );
    }
    return config;
  },
};
