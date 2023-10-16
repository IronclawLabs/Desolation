/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
    experimental: {
      appDir: true,
      serverActions:true,
    },
    reactStrictMode:false,
    images: {
      domains: ['cdn.discordapp.com'],
    },
    swcMinify: true,

    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      // Create a new rule for the enum.ts file
      config.module.rules.push({
        test: /\.mp3$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/chunks/[path][name].[hash][ext]',
        },
      });
      config.module.rules.push({
        test: /enums\.ts$/,
        use: defaultLoaders.babel,
      });
  
      return config;
    },
  }
  
  module.exports = nextConfig
  