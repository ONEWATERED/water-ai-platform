/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['api.dicebear.com', 'images.unsplash.com'],
  },
  experimental: {
    serverActions: true,
    appDir: true,
  },
}

module.exports = nextConfig
