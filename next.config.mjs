import * as dotenv from 'dotenv';
import withAnalyzer from '@next/bundle-analyzer';

dotenv.config();

const withBundleAnalyzer = withAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const transpileDependencies = ['react-image-crop'];

const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  webpack: (config, { isServer }) => {
    // add polyfills to all browsers
    const originalEntry = config.entry;

    // hide warnings https://github.com/vercel/next.js/discussions/30870#discussioncomment-1862620
    config.infrastructureLogging = {
      level: 'error',
    };

    // Fixes npm packages that depend on `fs`, `net`, `tls` modules
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
      };
    }

    config.entry = async () => {
      const entries = await originalEntry();

      if (entries['main.js'] && !entries['main.js'].includes('./client/polyfills.js')) {
        entries['main.js'].unshift('./client/polyfills.js');
      }

      return entries;
    };

    config.module.rules.unshift({
      test: /\.(tsx|ts|js|mjs|jsx)$/,
      include: new RegExp(`node_modules/(${transpileDependencies.join('|')})`),
    });

    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.(tsx|ts|js|mjs|jsx)$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    ASSET_HOST: process.env.ASSET_HOST || '',
    API_URL: process.env.API_URL,
    API_KEY_MAP: process.env.API_KEY_MAP,
    DEFAULT_LATITUDE: process.env.DEFAULT_LATITUDE,
    DEFAULT_LONGITUDE: process.env.DEFAULT_LONGITUDE,
    YANDEX_METRIKA_ID: process.env.YANDEX_METRIKA_ID,
    CLIENT_ROLLBAR_KEY: process.env.CLIENT_ROLLBAR_KEY,
    PRINT_HTTP_REQUEST_LOGS: process.env.PRINT_HTTP_REQUEST_LOGS,
    FEATURE_DISPUTES: process.env.FEATURE_DISPUTES,
    FEATURE_ADMIN_DISPUTES_PAGE: process.env.FEATURE_ADMIN_DISPUTES_PAGE,
  },
};

/** @type {import('next').NextConfig} */
export default () => {
  const plugins = [withBundleAnalyzer];
  return plugins.reduce((acc, next) => next(acc), nextConfig);
};
