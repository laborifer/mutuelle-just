/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.just.fr'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.just.fr',
        pathname: '/images/**',
      },
    ],
  },
  reactStrictMode: true,
}

module.exports = nextConfig 