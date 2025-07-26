/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: process.env.NODE_ENV === 'production' ? '/react-study-board' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/react-study-board/' : '',
}

module.exports = nextConfig
