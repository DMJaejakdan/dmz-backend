const NextFederationPlugin = require('@module-federation/nextjs-mf');
const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const withVanillaExtract = createVanillaExtractPlugin();
module.exports = withVanillaExtract({
  basePath: '/',
  webpack(config, options) {
    const { webpack } = options;
    if (!options.isServer) {
      //config.cache=false
      config.plugins.push(
        new NextFederationPlugin({
          name: 'frame',
          remotes: {
            archive: `archive@${process.env.NEXT_PUBLIC_ROOT}/dmzarchive/_next/static/chunks/remoteEntry.js`,
            dmzlib: `dmzlib@${process.env.NEXT_PUBLIC_ROOT}/dmzlib/_next/static/chunks/remoteEntry.js`,
            map: `map@${process.env.NEXT_PUBLIC_ROOT2}/dmzmap/_next/static/chunks/remoteEntry.js`,
          },
          filename: 'static/chunks/remoteEntry.js',
          exposes: {},
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
          extraOptions: {},
        })
      );
    }

    return config;
  },
});
