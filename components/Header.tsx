'use client';

import React from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';
import {
  Home,
  Info,
  Briefcase,
  Wrench,
  Package,
  Phone,
  Menu as MenuIcon,
  X as CloseIcon,
  Search,
  Globe,
} from 'lucide-react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';

import { cn } from '@/lib/utils';
import { useSiteContent } from '@/context/SiteContentContext';
import { getImageUrl } from '@/lib/api';
import LanguageSwitcher from './LanguageSwitcher';
import { MagneticButton } from './fx/MagneticButton';
import { NeonButton } from './fx/NeonButton';

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

/**
 * Normalize CMS-stored hashes (/#projects) to the new dedicated routes.
 */
const normalizeHref = (href: string): string => {
  if (!href) return '/';
  const h = href.trim();
  if (h === '/#projects' || h === '#projects') return '/projects';
  if (h === '/#services' || h === '#services') return '/services';
  if (h === '/#products' || h === '#products') return '/products';
  return h;
};

const iconForHref = (href: string): React.ReactNode => {
  if (href === '/') return <Home className="size-4" />;
  if (href.includes('about')) return <Info className="size-4" />;
  if (href.includes('product')) return <Package className="size-4" />;
  if (href.includes('project') || href.includes('work')) return <Briefcase className="size-4" />;
  if (href.includes('service')) return <Wrench className="size-4" />;
  if (href.includes('contact')) return <Phone className="size-4" />;
  return <Globe className="size-4" />;
};

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const t = useTranslations('header');
  const pathname = usePathname();
  const { content, setting } = useSiteContent();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (v) => {
    setScrolled(v > 12);
  });

  // Lock scroll when the mobile drawer is open.
  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [mobileOpen]);

  const logoSrc = React.useMemo(
    () =>
      getImageUrl(setting('logo_url', locale === 'ar' ? 'ar' : 'en')) ||
      '/logo/AL BURHAN GROUP .png',
    [setting, locale],
  );

  const navigationItems: NavItem[] = React.useMemo(() => {
    if (content?.navigation && content.navigation.length > 0) {
      return content.navigation.map((item) => {
        const href = normalizeHref(item.href);
        return {
          label: (locale === 'ar' ? item.label_ar : item.label_en) || item.label_en,
          href,
          icon: iconForHref(href),
        };
      });
    }
    return [
      { label: t('home'), href: '/', icon: <Home className="size-4" /> },
      { label: t('aboutUs'), href: '/about', icon: <Info className="size-4" /> },
      { label: t('ourProducts'), href: '/products', icon: <Package className="size-4" /> },
      { label: t('ourProjects'), href: '/projects', icon: <Briefcase className="size-4" /> },
      { label: t('services'), href: '/services', icon: <Wrench className="size-4" /> },
      { label: t('contact'), href: '/contact', icon: <Phone className="size-4" /> },
    ];
  }, [content, locale, t]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const openPalette = () => {
    // Dispatch a synthetic Cmd+K so the CommandPalette picks it up.
    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true }),
    );
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
        className={cn(
          'sticky top-0 z-[800] w-full transition-all duration-500',
          scrolled
            ? 'bg-[rgba(7,7,11,0.72)] backdrop-blur-xl backdrop-saturate-150 border-b border-[color:var(--glass-border)] shadow-[0_8px_32px_rgba(0,0,0,0.35)]'
            : 'bg-transparent',
        )}
        style={{ direction: 'ltr' }}
      >
        {/* Top neon hairline */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-70"
          style={{
            background:
              'linear-gradient(90deg, transparent 5%, rgba(201,169,79,0.55) 50%, transparent 95%)',
          }}
        />

        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="group relative flex shrink-0 items-center"
            data-cursor-label="Home"
          >
            <div className="relative h-10 w-36 overflow-hidden sm:h-12 sm:w-44 lg:h-14 lg:w-52">
              <Image
                src={logoSrc}
                alt="AL-Burhan Group"
                fill
                style={{ objectFit: 'contain', objectPosition: 'left center' }}
                priority
                unoptimized
                className="transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </div>
            <motion.span
              aria-hidden
              className="pointer-events-none absolute -inset-1 rounded-lg opacity-0 blur-xl group-hover:opacity-100"
              style={{
                background:
                  'radial-gradient(closest-side, rgba(201,169,79,0.35), transparent 70%)',
                transition: 'opacity 400ms ease',
              }}
            />
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden items-center gap-1 lg:flex"
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {navigationItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={`${item.label}-${item.href}`}
                  href={item.href as any}
                  data-cursor-label={item.label}
                  className={cn(
                    'group relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-300',
                    active
                      ? 'text-[color:var(--brand-gold-bright)]'
                      : 'text-[color:var(--fg-default)]/85 hover:text-[color:var(--brand-gold-bright)]',
                  )}
                >
                  <span className="relative z-10">{item.label}</span>
                  <motion.span
                    aria-hidden
                    layoutId={active ? 'nav-underline' : undefined}
                    className={cn(
                      'absolute left-2 right-2 bottom-0 h-px origin-center',
                      active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
                    )}
                    style={{
                      background:
                        'linear-gradient(90deg, transparent, var(--brand-gold), transparent)',
                      boxShadow: '0 0 10px rgba(201,169,79,0.6)',
                      transition: 'opacity 300ms ease',
                    }}
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 -z-10 rounded-lg bg-[rgba(201,169,79,0.06)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            {/* Cmd-K trigger (desktop only) */}
            <button
              type="button"
              onClick={openPalette}
              aria-label="Search"
              data-cursor-label="Search"
              className={cn(
                'hidden items-center gap-2 rounded-full border border-[color:var(--glass-border)] px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-[color:var(--fg-muted)] transition-colors duration-300 md:inline-flex',
                'hover:border-[color:var(--brand-gold)] hover:text-[color:var(--brand-gold-bright)]',
              )}
            >
              <Search className="size-3.5" />
              <span>Search</span>
              <kbd className="hidden rounded border border-[color:var(--glass-border)] px-1.5 py-0.5 text-[10px] font-medium tracking-normal md:inline-block">
                ⌘K
              </kbd>
            </button>

            <LanguageSwitcher />

            {/* Contact CTA (desktop) */}
            <div className="hidden lg:block">
              <MagneticButton>
                <NeonButton asChild size="sm" variant="outline">
                  <Link href="/contact" data-cursor-label="Contact">
                    <Phone className="size-4" />
                    <span>{t('contact')}</span>
                  </Link>
                </NeonButton>
              </MagneticButton>
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
              data-cursor-label="Menu"
              className={cn(
                'inline-flex size-10 items-center justify-center rounded-full border border-[color:var(--glass-border)] lg:hidden',
                'text-[color:var(--fg-default)] transition-colors duration-300 hover:border-[color:var(--brand-gold)] hover:text-[color:var(--brand-gold-bright)]',
              )}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CloseIcon className="size-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="m"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MenuIcon className="size-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-drawer"
            className="fixed inset-0 z-[850] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 bg-[rgba(3,3,6,0.75)] backdrop-blur-md"
            />
            <motion.aside
              role="dialog"
              aria-label="Mobile navigation"
              initial={{ x: isRTL ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? '-100%' : '100%' }}
              transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
              className={cn(
                'absolute top-0 bottom-0 flex h-full w-[min(86vw,380px)] flex-col gap-6 overflow-y-auto p-6',
                isRTL ? 'left-0 border-r' : 'right-0 border-l',
                'border-[color:var(--glass-border)] bg-[color:var(--bg-raised)] shadow-[0_0_60px_rgba(0,0,0,0.5)]',
              )}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              <div className="flex items-center justify-between">
                <div className="relative h-9 w-32">
                  <Image src={logoSrc} alt="AL-Burhan Group" fill style={{ objectFit: 'contain', objectPosition: 'left center' }} unoptimized />
                </div>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close"
                  className="size-9 rounded-full border border-[color:var(--glass-border)] text-[color:var(--fg-default)] transition-colors hover:border-[color:var(--brand-gold)] hover:text-[color:var(--brand-gold-bright)]"
                >
                  <CloseIcon className="m-auto size-4" />
                </button>
              </div>

              <nav className="flex flex-1 flex-col gap-1">
                {navigationItems.map((item, i) => {
                  const active = isActive(item.href);
                  return (
                    <motion.div
                      key={`${item.label}-${item.href}`}
                      initial={{ opacity: 0, x: isRTL ? -16 : 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i + 0.1, duration: 0.35 }}
                    >
                      <Link
                        href={item.href as any}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          'group flex items-center gap-3 rounded-xl px-3 py-3 text-base transition-colors duration-200',
                          active
                            ? 'bg-[rgba(194,50,74,0.18)] text-[color:var(--brand-gold-bright)]'
                            : 'text-[color:var(--fg-default)] hover:bg-white/[0.03] hover:text-[color:var(--brand-gold-bright)]',
                        )}
                      >
                        <span
                          className={cn(
                            'flex size-9 items-center justify-center rounded-lg border',
                            active
                              ? 'border-[color:var(--brand-gold)] text-[color:var(--brand-gold)]'
                              : 'border-[color:var(--glass-border)] text-[color:var(--fg-muted)] group-hover:border-[color:var(--brand-gold)] group-hover:text-[color:var(--brand-gold)]',
                          )}
                        >
                          {item.icon}
                        </span>
                        <span className="font-medium tracking-wide">{item.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="mt-auto border-t border-[color:var(--glass-border)] pt-6">
                <NeonButton asChild className="w-full" size="lg">
                  <Link href="/contact" onClick={() => setMobileOpen(false)}>
                    <Phone className="size-4" />
                    {t('contact')}
                  </Link>
                </NeonButton>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
