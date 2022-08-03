/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    images: { allowFutureImage: true },
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  swcMinify: true,
}

module.exports = nextConfig
