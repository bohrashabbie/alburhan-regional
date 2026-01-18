import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  // Vercel supports full Next.js features including server-side rendering
  // Remove static export for Vercel deployment
  
  // Enable image optimization (Vercel supports Next.js Image Optimization API)
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  
  // Trailing slashes are optional for Vercel
  trailingSlash: true,
};

export default withNextIntl(nextConfig);
