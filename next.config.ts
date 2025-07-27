import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Para GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/react-study-board' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/react-study-board/' : '',
};

export default nextConfig;
