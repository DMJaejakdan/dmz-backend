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
            dmzlib: `dmzlib@${process.env.NEXT_PUBLIC_ROOT}/dmzlib/_next/static/chunks/remoteEntry.js`,
          },
          exposes: {
            './ArchivePage': './pages/index',
            './pages-map': './pages-map.js',
          },
          shared: {
            next: {
              eager: true,
              singleton: true,
              requiredVersion: '^13.3.0',
            },
            '@vanilla-extract/css': {
              eager: true,
              singleton: true,
              requiredVersion: '^1.13.0',
            },
          },
        })
      );
    }
    return config;
  },
});
