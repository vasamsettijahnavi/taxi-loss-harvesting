/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'coin-images.coingecko.com',
      'koinx-statics.s3.ap-south-1.amazonaws.com'
    ],
    unoptimized: true,
  },
}

export default nextConfig
