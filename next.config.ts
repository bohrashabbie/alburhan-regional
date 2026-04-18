import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  output: 'standalone',
  
  images: {
    // S3 is already web-ready; skip Next's optimizer to avoid fetch timeouts
    // from remote buckets (and quality-list warnings in Next 16).
    unoptimized: true,
    qualities: [75, 90, 100],
    remotePatterns: [
      { protocol: 'https', hostname: 'flagcdn.com', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'http', hostname: '13.60.4.75', port: '8002', pathname: '/uploads/**' },
      // S3 buckets (path-style and virtual-hosted-style)
      { protocol: 'https', hostname: '*.s3.amazonaws.com', pathname: '/**' },
      { protocol: 'https', hostname: '*.s3.*.amazonaws.com', pathname: '/**' },
      { protocol: 'https', hostname: 's3.*.amazonaws.com', pathname: '/**' },
      // CloudFront CDN (common pattern)
      { protocol: 'https', hostname: '*.cloudfront.net', pathname: '/**' },
    ],
  },
  
  // Trailing slashes are optional for Vercel
  trailingSlash: true,
};

export default withNextIntl(nextConfig);
