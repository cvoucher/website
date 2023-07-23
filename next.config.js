const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@uniswap/conedison"],
};

module.exports = nextConfig;
