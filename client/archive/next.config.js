const NextFederationPlugin = require('@module-federation/nextjs-mf');
const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const withVanillaExtract = createVanillaExtractPlugin();
module.exports = withVanillaExtract({
  webpack(config, options) {
    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'archive',
          filename: 'static/chunks/remoteEntry.js',
          remotes: {
            dmzlib:
              'dmzlib@http://localhost:3001/_next/static/chunks/remoteEntry.js',
          },
          exposes: {
            './ArchivePage': './pages/ArchivePage',
            './pages-map': './pages-map.js',
          },
        })
      );
    }
    return config;
  },
});
