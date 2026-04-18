import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const ONE_YEAR = 60 * 60 * 24 * 365;

const nextConfig: NextConfig = {
  output: 'standalone',

  // --- Build / bundle optimizations ---------------------------------------
  reactStrictMode: true,
  compress: true,
  productionBrowserSourceMaps: false,
  poweredByHeader: false,

  compiler: {
    // Strip console.* in production builds (keep error/warn for observability).
    removeConsole: { exclude: ['error', 'warn'] },
  },

  experimental: {
    // Barrel-optimize heavy icon / UI / animation packages. Each of these
    // re-exports hundreds of modules; without this, importing a single icon
    // pulls in the entire package in client bundles.
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      '@radix-ui/react-accordion',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-navigation-menu',
      '@radix-ui/react-tabs',
      '@radix-ui/react-tooltip',
      'country-flag-icons',
    ],
  },

  // --- Images --------------------------------------------------------------
  images: {
    // Keep unoptimized for S3 to avoid remote fetch timeouts, but let Next
    // still cache optimized variants for 1h (for hosts it does handle).
    unoptimized: true,
    qualities: [75, 90, 100],
    minimumCacheTTL: 60 * 60,
    remotePatterns: [
      { protocol: 'https', hostname: 'flagcdn.com', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'http', hostname: '13.60.4.75', port: '8002', pathname: '/uploads/**' },
      { protocol: 'https', hostname: '*.s3.amazonaws.com', pathname: '/**' },
      { protocol: 'https', hostname: '*.s3.*.amazonaws.com', pathname: '/**' },
      { protocol: 'https', hostname: 's3.*.amazonaws.com', pathname: '/**' },
      { protocol: 'https', hostname: '*.cloudfront.net', pathname: '/**' },
    ],
  },

  trailingSlash: true,

  // --- Browser cache headers ----------------------------------------------
  // Next's static chunks are content-hashed, so they can be cached forever.
  // Everything else gets a sane default; API routes stay uncached.
  async headers() {
    return [
      {
        // Hashed JS / CSS / media emitted by the Next build.
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: `public, max-age=${ONE_YEAR}, immutable` },
        ],
      },
      {
        // Next's optimized image pipeline (when used).
        source: '/_next/image(.*)',
        headers: [
          { key: 'Cache-Control', value: `public, max-age=${ONE_YEAR}, immutable` },
        ],
      },
      {
        // Assets you ship from /public (logo, favicons, static jpgs). These
        // aren't fingerprinted so use a 1-day cache with stale-while-revalidate.
        source: '/:path*.(jpg|jpeg|png|gif|webp|avif|svg|ico|woff|woff2|ttf|otf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
      {
        // Never cache API responses — they proxy live CMS data.
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store, must-revalidate' },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
