import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  // Enable static export for GoDaddy shared hosting (no Node.js support)
  output: 'export',
  
  // Disable image optimization (shared hosting doesn't support Next.js Image Optimization API)
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        pathname: '/**',
      },
    ],
  },
  
  // Ensure trailing slashes for better compatibility with static hosting
  trailingSlash: true,
  
  // Disable server-side features that won't work with static export
  // These are automatically handled by static export
  
  // Optional: Set base path if your site is in a subdirectory
  // basePath: '/your-subdirectory',
  
  // Optional: Set asset prefix if assets are served from a CDN
  // assetPrefix: '/your-assets-prefix',
};

export default withNextIntl(nextConfig);
