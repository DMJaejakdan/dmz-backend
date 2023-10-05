const NextFederationPlugin = require('@module-federation/nextjs-mf');
const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const withVanillaExtract = createVanillaExtractPlugin();
module.exports = withVanillaExtract({
  webpack(config, options) {
    const { webpack } = options;
    if (!options.isServer) {
      //config.cache=false
      config.plugins.push(
        new NextFederationPlugin({
          name: 'frame',
          remotes: {
            archive:
              'archive@http://localhost:3002/_next/static/chunks/remoteEntry.js',
            dmzlib:
              'dmzlib@http://localhost:3001/_next/static/chunks/remoteEntry.js',
            map: 'map@http://localhost:3003/_next/static/chunks/remoteEntry.js',
          },
          filename: 'static/chunks/remoteEntry.js',
          exposes: {},
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
          extraOptions: {},
        })
      );
    }

    return config;
  },
});
