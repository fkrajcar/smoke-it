/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['assets.faceit-cdn.net', 'distribution.faceit-cdn.net'],
  },
}

module.exports = nextConfig
