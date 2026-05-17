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
    // Next.js image optimization is now ENABLED (removed `unoptimized: true`).
    // The optimizer resizes images to the requested width, converts to WebP/AVIF,
    // and caches the result on disk — often 60–80% smaller than the raw S3 JPEG.
    // If a downstream CMS image fetch times out the optimizer returns the
    // original gracefully; set `unoptimized: true` to revert if needed.
    formats: ['image/avif', 'image/webp'],
    qualities: [60, 75, 90],
    minimumCacheTTL: 60 * 60 * 24, // cache optimized images for 24 h (was 1 h)
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
