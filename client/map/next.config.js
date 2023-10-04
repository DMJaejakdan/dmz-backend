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
            './Map': './pages/map/container.tsx',
          },
          shared: {
            next: {
              eager: true,
              singleton: true,
              requiredVersion: '^13.3.0',
            },
            react: {
              eager: true,
              singleton: true,
              requiredVersion: '^18.2.0',
            },
            'react-dom': {
              eager: true,
              singleton: true,
              requiredVersion: '^18.2.0',
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
