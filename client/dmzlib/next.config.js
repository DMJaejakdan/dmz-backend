const NextFederationPlugin = require('@module-federation/nextjs-mf');
const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const withVanillaExtract = createVanillaExtractPlugin();
process.env.TZ = 'Asia/Seoul';

module.exports = withVanillaExtract({
  async headers() {
    return [
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ];
  },
  basePath: '/dmzlib',
  webpack(config, options) {
    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'dmzlib',
          filename: 'static/chunks/remoteEntry.js',
          exposes: {
            //Theme
            './theme': './_lib/design/theme.css.ts',
            //Hooks
            //Util
            //Constants
            './card': './_lib/constants/card.ts',
            './map': './_lib/constants/map.ts',
            './searchbox': './_lib/constants/searchbox.ts',
            './tabs': './_lib/constants/tabs.ts',
            //Components
            //common
            './Button': './_lib/components/common/button/Button.tsx',
            './Chip': './_lib/components/common/chip/Chip.tsx',
            './Flex': './_lib/components/common/flex/Flex.tsx',
            './Icon': './_lib/components/common/icon/Icon.tsx',
            './Input': './_lib/components/common/input/Input.tsx',
            './Spacing': './_lib/components/common/spacing/Spacing.tsx',
            './Title': './_lib/components/common/title/Title.tsx',
            './Txt': './_lib/components/common/txt/Txt.tsx',
            './Nav': './_lib/components/common/nav/Nav.tsx',
            //archive
            //card
            './DetailMediaCard':
              './_lib/components/archive/card/detail-media-card/DetailMediaCard.tsx',
            './DetailPersonCard':
              './_lib/components/archive/card/detail-person-card/DetailPersonCard.tsx',
            './DramaCard':
              './_lib/components/archive/card/drama-card/DramaCard.tsx',
            './MovieCard':
              './_lib/components/archive/card/movie-card/MovieCard.tsx',
            './PersonCard':
              './_lib/components/archive/card/person-card/PersonCard.tsx',
            //pagination
            './Pagination':
              './_lib/components/archive/pagination/Pagination.tsx',
            './PaginationButton':
              './_lib/components/archive/pagination/pagination-button/PaginationButton.tsx',
            './PaginationChevron':
              './_lib/components/archive/pagination/pagination-chevron/PaginationChevron.tsx',
            //search-box
            './DateBox':
              './_lib/components/archive/search-box/date-box/DateBox.tsx',
            './FilterBox':
              './_lib/components/archive/search-box/filter-box/FilterBox.tsx',
            './InputBox':
              './_lib/components/archive/search-box/input-box/InputBox.tsx',
            './KeywordBox':
              './_lib/components/archive/search-box/keyword-box/KeywordBox.tsx',
            //tabs
            './Tabs': './_lib/components/archive/tabs/Tabs.tsx',
            //map
            //search
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
