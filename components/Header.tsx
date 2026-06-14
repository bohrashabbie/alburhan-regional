'use client';

import React from 'react';
import { Menu as MenuIcon, X as CloseIcon } from 'lucide-react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';

import { cn } from '@/lib/utils';
import { useSiteContent } from '@/context/SiteContentContext';
import { getImageUrl } from '@/lib/api';
import LanguageSwitcher from './LanguageSwitcher';

type NavItem = { label: string; href: string };

const normalizeHref = (href: string): string => {
  if (!href) return '/';
  const h = href.trim();
  if (h === '/#projects' || h === '#projects') return '/projects';
  if (h === '/#services' || h === '#services') return '/services';
  if (h === '/#products' || h === '#products') return '/products';
  return h;
};

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const t = useTranslations('header');
  const pathname = usePathname();
  const { content, setting } = useSiteContent();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.documentElement.style.overflow = ''; };
  }, [mobileOpen]);

  const logoSrc = React.useMemo(
    () =>
      getImageUrl(setting('logo_url', locale === 'ar' ? 'ar' : 'en')) ||
      '/logo/AL BURHAN GROUP .png',
    [setting, locale],
  );

  const navigationItems: NavItem[] = React.useMemo(() => {
    if (content?.navigation && content.navigation.length > 0) {
      return content.navigation.map((item) => ({
        label: (locale === 'ar' ? item.label_ar : item.label_en) || item.label_en,
        href: normalizeHref(item.href),
      }));
    }
    return [
      { label: t('home'), href: '/' },
      { label: t('aboutUs'), href: '/about' },
      { label: t('ourProducts'), href: '/products' },
      { label: t('ourProjects'), href: '/projects' },
      { label: t('services'), href: '/services' },
      { label: t('contact'), href: '/contact' },
    ];
  }, [content, locale, t]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      {/* ── Desktop / scrolled header ── */}
      <header
        className={cn(
          'fixed left-0 right-0 top-0 z-[800] w-full transition-all duration-500',
          scrolled
            ? 'border-b border-[#1A1A1A] bg-[rgba(8,8,8,0.92)] backdrop-blur-[12px]'
            : 'bg-transparent',
        )}
        style={{ direction: 'ltr' }}
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="relative flex shrink-0 items-center">
            <div className="relative h-10 w-40 sm:h-12 sm:w-48">
              <Image
                src={logoSrc}
                alt="AL-Burhan Group"
                fill
                sizes="192px"
                style={{ objectFit: 'contain', objectPosition: 'left center' }}
                priority
              />
            </div>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden items-center gap-7 lg:flex"
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href as any}
                className={cn(
                  'text-[13px] transition-colors duration-300',
                  isActive(item.href)
                    ? 'text-[#D4A843]'
                    : 'text-[#555] hover:text-white',
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />

            {/* Desktop CTA */}
            <Link
              href="/contact"
              className="hidden lg:inline-flex items-center gap-1.5 border border-[#D4A843] px-4 py-1.5 text-[11px] uppercase tracking-[0.15em] text-[#D4A843] transition-all duration-300 hover:bg-[#D4A843] hover:text-black"
            >
              {t('contact')}
            </Link>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
              className="inline-flex size-9 items-center justify-center text-[#555] transition-colors hover:text-white lg:hidden"
            >
              {mobileOpen ? (
                <CloseIcon className="size-5" />
              ) : (
                <MenuIcon className="size-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile fullscreen overlay ── */}
      <div
        className={cn(
          'fixed inset-0 z-[850] flex flex-col lg:hidden',
          'transition-all duration-500',
          mobileOpen ? 'pointer-events-auto' : 'pointer-events-none',
        )}
        aria-hidden={!mobileOpen}
      >
        {/* Dark backdrop */}
        <div
          className={cn(
            'absolute inset-0 bg-[#080808] transition-opacity duration-500',
            mobileOpen ? 'opacity-100' : 'opacity-0',
          )}
        />

        {/* Content */}
        <div
          className={cn(
            'relative z-10 flex h-full flex-col items-center justify-center gap-7',
            'transition-all duration-500',
            mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5',
          )}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="absolute right-5 top-4 text-[#444] transition-colors hover:text-white"
          >
            <CloseIcon className="size-6" />
          </button>

          {/* Nav links */}
          <nav className="flex flex-col items-center gap-5">
            {navigationItems.map((item, i) => (
              <Link
                key={item.href}
                href={item.href as any}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'text-[32px] font-light leading-none tracking-[-0.02em] transition-colors duration-300',
                  isActive(item.href)
                    ? 'text-[#D4A843]'
                    : 'text-white hover:text-[#D4A843]',
                )}
                style={{ transitionDelay: mobileOpen ? `${i * 50}ms` : '0ms' }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Contact CTA */}
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="mt-4 border border-[#D4A843] px-8 py-3 text-[12px] uppercase tracking-[0.2em] text-[#D4A843] transition-all duration-300 hover:bg-[#D4A843] hover:text-black"
          >
            {t('contact')}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
