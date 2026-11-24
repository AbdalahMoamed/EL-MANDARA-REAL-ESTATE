/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Ensure output can be exported statically or deployed to Vercel/Node
  output: 'standalone',
};

module.exports = nextConfig;
