/** @type {import('next').NextConfig} */

const nextTranslate = require('next-translate');

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  ...nextTranslate(),
};

module.exports = nextConfig;
