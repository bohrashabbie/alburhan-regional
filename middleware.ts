import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  // Note: With static export, this middleware runs during build time
  // Runtime routing is handled by .htaccess on cPanel
  matcher: ['/', '/(ar|en)/:path*']
};

