/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    images: { allowFutureImage: true },
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  swcMinify: true,
  pwa: {
    dest: 'public',
  },
}

module.exports = withPWA(nextConfig)
