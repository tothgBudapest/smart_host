/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')
const nextConfig = {
  reactStrictMode: true,
  i18n,
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    config.module = {
      ...config.module,
      exprContextCritical: false,
    };
    return config;
  },
}

module.exports = nextConfig
