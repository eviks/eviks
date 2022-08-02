/** @type {import('next').NextConfig} */

const nextTranslate = require('next-translate');

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'lh3.googleusercontent.com', 'eviks.xyz'],
  },
  ...nextTranslate(),
};

module.exports = nextConfig;
