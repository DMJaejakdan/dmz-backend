const NextFederationPlugin = require('@module-federation/nextjs-mf');
const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const withVanillaExtract = createVanillaExtractPlugin();
module.exports = withVanillaExtract({
  experimental: {
    largePageDataBytes: 128 * 1000000,
  },
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
            // './Map': './pages/map/container.tsx',
          },
        })
      );
    }
    return config;
  },
});
