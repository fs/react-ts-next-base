const path = require('path');

module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: ['../components/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    'storybook-addon-swc',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-addon-apollo-client',
    'storybook-formik/register',
    'storybook-addon-next-router',
  ],
  framework: '@storybook/react',
  features: {
    postcss: false,
  },
  staticDirs: ['../public'],
  webpackFinal: async (config, { isServer }) => {
    config.resolve.modules = [...(config.resolve.modules || []), path.resolve(__dirname, '../')];
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
        path: require.resolve('path-browserify'),
        os: false,
      };
    }
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });
    const fileLoaderRule = config.module.rules.find(rule => rule.test && rule.test.test('.svg'));
    fileLoaderRule.exclude = /\.svg$/;

    config.module.rules.push({
      test: /\.svg$/,
      enforce: 'pre',
      loader: require.resolve('@svgr/webpack'),
    });
    return config;
  },
  env: {
    __NEXT_NEW_LINK_BEHAVIOR: true,
  },
};
