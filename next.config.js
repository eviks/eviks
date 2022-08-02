/** @type {import('next').NextConfig} */

const nextTranslate = require('next-translate');

const withTM = require('next-transpile-modules')([
  '@mui/base',
  '@mui/material',
  '@mui/styles',
  '@mui/system',
  '@mui/styled-engine',
  '@mui/utils',
  '@mui/private-theming',
  'next-translate',
]);

const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ['localhost', 'lh3.googleusercontent.com'],
  },

  webpack(config) {
    const originalEntry = config.entry;
    // eslint-disable-next-line no-param-reassign
    config.entry = async () => {
      const entries = await originalEntry();

      if (
        entries['main.js'] &&
        !entries['main.js'].includes('./utils/polyfills.ts')
      ) {
        entries['main.js'].unshift('./utils/polyfills.ts');
      }

      return entries;
    };

    return config;
  },
};

module.exports = nextTranslate(withTM(nextConfig));
