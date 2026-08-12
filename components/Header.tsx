'use client';

import React from 'react';
import Image from 'next/image';
import { ChevronDown, Menu as MenuIcon, X as CloseIcon, ArrowUpRight } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';

import { cn } from '@/lib/utils';
import { useSiteContent } from '@/context/SiteContentContext';
import { getImageUrl } from '@/lib/api';
import { familiesByZone } from '@/lib/catalog/ms-lighting';
import LanguageSwitcher from './LanguageSwitcher';
import { ThemeToggle } from './chrome/ThemeToggle';

type NavItem = { label: string; href: string; mega?: boolean };

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [megaOpen, setMegaOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const t = useTranslations('header');
  const pathname = usePathname();
  const { setting } = useSiteContent();

  const indoor = React.useMemo(() => familiesByZone('indoor'), []);
  const outdoor = React.useMemo(() => familiesByZone('outdoor'), []);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock the page behind the mobile sheet, and close both menus on navigation.
  React.useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.documentElement.style.overflow = ''; };
  }, [mobileOpen]);

  // Route changes must collapse both menus. The mega panel opens on hover with
  // no click of its own, so there is no event handler to hang this off — the
  // pathname is genuinely the external signal being synchronised here.
  React.useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setMobileOpen(false);
    setMegaOpen(false);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [pathname]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setMegaOpen(false);
      setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const logoSrc = React.useMemo(
    () =>
      getImageUrl(setting('logo_url', isRTL ? 'ar' : 'en')) ||
      '/logo/AL BURHAN GROUP .png',
    [setting, isRTL],
  );

  const nav: NavItem[] = [
    { label: t('ourProducts'), href: '/products', mega: true },
    { label: t('ourProjects'), href: '/projects' },
    { label: t('services'), href: '/services' },
    { label: t('aboutUs'), href: '/about' },
    { label: t('contact'), href: '/contact' },
  ];

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      {/* ── Geo strip: who we are and where, before anything is clicked ── */}
      <div className="relative z-[810] hidden border-b border-line bg-surface md:block">
        <div className="wrap flex h-9 items-center justify-between">
          <p className="t-mono text-[0.625rem] text-ink-4">
            {isRTL
              ? 'الكويت · الإمارات · الصين · مصر'
              : 'Kuwait · UAE · China · Egypt'}
          </p>
          <a
            href="https://mslighting.alburhan-regional.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-[0.6875rem] text-ink-3 transition-colors hover:text-accent"
          >
            <span className="t-mono text-[0.625rem]">
              {isRTL ? 'مصنعنا' : 'Our factory'}
            </span>
            <span className="font-medium">MS Lighting</span>
            <ArrowUpRight className="size-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>

      {/* ── Main bar ── */}
      <header
        className={cn(
          'sticky top-0 z-[800] w-full border-b transition-all duration-500',
          scrolled
            ? 'border-line bg-glass-strong shadow-[var(--shadow-1)] backdrop-blur-[16px] backdrop-saturate-150'
            : 'border-transparent bg-canvas',
        )}
        onMouseLeave={() => setMegaOpen(false)}
      >
        <div
          className={cn(
            'wrap flex items-center justify-between gap-6 transition-[height] duration-500',
            scrolled ? 'h-[3.75rem]' : 'h-[4.5rem]',
          )}
        >
          {/* Logo */}
          <Link href="/" className="relative flex shrink-0 items-center" aria-label="Al-Burhan Regional — home">
            <span
              className={cn(
                'relative block transition-all duration-500',
                scrolled ? 'h-8 w-28 sm:w-32' : 'h-9 w-32 sm:h-10 sm:w-40 md:w-44',
              )}
            >
              <Image
                src={logoSrc}
                alt="Al-Burhan Group"
                fill
                sizes="176px"
                style={{ objectFit: 'contain', objectPosition: isRTL ? 'right center' : 'left center' }}
                priority
              />
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {nav.map((item) =>
              item.mega ? (
                <button
                  key={item.href}
                  type="button"
                  onMouseEnter={() => setMegaOpen(true)}
                  onClick={() => setMegaOpen((o) => !o)}
                  aria-expanded={megaOpen}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-sm px-3 py-2 text-[0.8125rem] font-medium transition-colors duration-300',
                    isActive(item.href) || megaOpen
                      ? 'text-accent'
                      : 'text-ink-2 hover:text-ink',
                  )}
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      'size-3.5 transition-transform duration-300',
                      megaOpen && 'rotate-180',
                    )}
                  />
                </button>
              ) : (
                <Link
                  key={item.href}
                  href={item.href as never}
                  onMouseEnter={() => setMegaOpen(false)}
                  className={cn(
                    'rounded-sm px-3 py-2 text-[0.8125rem] font-medium transition-colors duration-300',
                    isActive(item.href) ? 'text-accent' : 'text-ink-2 hover:text-ink',
                  )}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle className="hidden sm:inline-flex" />
            <LanguageSwitcher />

            <Link
              href="/contact"
              className="btn btn-primary hidden h-9 min-h-9 px-4 text-[0.75rem] lg:inline-flex"
            >
              {isRTL ? 'اطلب عرض سعر' : 'Request a quote'}
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="inline-flex size-9 items-center justify-center text-ink-2 transition-colors hover:text-accent lg:hidden"
            >
              <MenuIcon className="size-5" />
            </button>
          </div>
        </div>

        {/* ── Products mega panel ── */}
        <div
          className={cn(
            'absolute inset-x-0 top-full hidden overflow-hidden border-b border-line bg-canvas lg:block',
            'transition-[max-height,opacity] duration-500 [transition-timing-function:var(--ease-out-expo)]',
            megaOpen ? 'max-h-[34rem] opacity-100 shadow-[var(--shadow-2)]' : 'max-h-0 opacity-0',
          )}
          onMouseEnter={() => setMegaOpen(true)}
        >
          <div className="wrap grid grid-cols-12 gap-8 py-9">
            <MegaColumn
              label={isRTL ? 'إضاءة داخلية' : 'Indoor'}
              href="/products?zone=indoor"
              families={indoor}
            />
            <MegaColumn
              label={isRTL ? 'إضاءة خارجية' : 'Outdoor'}
              href="/products?zone=outdoor"
              families={outdoor}
            />

            {/* Featured plate — the range at a glance */}
            <div className="col-span-4">
              <Link
                href="/products"
                className="group relative block overflow-hidden border border-line bg-surface"
              >
                <span className="relative block aspect-[4/3]">
                  <Image
                    src={indoor[0]?.image ?? ''}
                    alt=""
                    fill
                    sizes="360px"
                    className="object-contain p-8 transition-transform duration-[900ms] [transition-timing-function:var(--ease-out-expo)] group-hover:scale-[1.04]"
                  />
                </span>
                <span className="block border-t border-line p-5">
                  <span className="t-mono block text-[0.625rem] text-accent">
                    {isRTL ? 'الكتالوج الكامل' : 'Full catalogue'}
                  </span>
                  <span className="mt-2 block text-[0.9375rem] font-medium text-ink">
                    {isRTL ? '109 موديل · 15 عائلة' : '109 models · 15 families'}
                  </span>
                  <span className="mt-1 block text-[0.8125rem] text-ink-3">
                    {isRTL
                      ? 'مصنّعة في مصنعنا في جيانغمن، الصين'
                      : 'Built in our own factory in Jiangmen, China'}
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile sheet ── */}
      <div
        className={cn(
          'fixed inset-0 z-[900] lg:hidden',
          mobileOpen ? 'pointer-events-auto' : 'pointer-events-none',
        )}
        aria-hidden={!mobileOpen}
      >
        <div
          onClick={() => setMobileOpen(false)}
          className={cn(
            'absolute inset-0 bg-canvas transition-opacity duration-500',
            mobileOpen ? 'opacity-100' : 'opacity-0',
          )}
        />

        <div
          className={cn(
            'relative flex h-full flex-col transition-transform duration-[600ms] [transition-timing-function:var(--ease-out-expo)]',
            mobileOpen ? 'translate-y-0' : '-translate-y-4',
          )}
        >
          <div className="flex h-[4.5rem] items-center justify-between border-b border-line px-5">
            <span className="t-mono text-[0.625rem] text-ink-4">
              {isRTL ? 'القائمة' : 'Menu'}
            </span>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="inline-flex size-9 items-center justify-center text-ink-2 transition-colors hover:text-accent"
            >
              <CloseIcon className="size-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-5 py-6" aria-label="Mobile">
            {nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href as never}
                className={cn(
                  'flex items-baseline justify-between border-b border-line py-4 transition-colors duration-300',
                  isActive(item.href) ? 'text-accent' : 'text-ink hover:text-accent',
                )}
                style={{
                  opacity: mobileOpen ? 1 : 0,
                  transform: mobileOpen ? 'none' : 'translateY(10px)',
                  transition: `opacity 500ms ${60 + i * 55}ms var(--ease-out-expo), transform 500ms ${60 + i * 55}ms var(--ease-out-expo), color 300ms`,
                }}
              >
                <span className="text-[1.5rem] font-medium tracking-[-0.03em]">{item.label}</span>
                <span className="t-mono text-[0.625rem] text-ink-4">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </Link>
            ))}

            <div className="mt-8 flex items-center justify-between">
              <span className="t-mono text-[0.625rem] text-ink-4">
                {isRTL ? 'المظهر' : 'Appearance'}
              </span>
              <ThemeToggle />
            </div>

            <Link href="/contact" className="btn btn-primary btn-lg mt-6 w-full">
              {isRTL ? 'اطلب عرض سعر' : 'Request a quote'}
            </Link>

            <a
              href="https://mslighting.alburhan-regional.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-between border border-line px-4 py-3 text-[0.8125rem] text-ink-2"
            >
              <span>MS Lighting — {isRTL ? 'مصنعنا' : 'our factory'}</span>
              <ArrowUpRight className="size-4 text-accent" />
            </a>
          </nav>
        </div>
      </div>
    </>
  );
};

function MegaColumn({
  label,
  href,
  families,
}: {
  label: string;
  href: string;
  families: { slug: string; name: string; products: unknown[] }[];
}) {
  return (
    <div className="col-span-4">
      <Link href={href as never} className="kicker mb-4 hover:opacity-80">
        {label}
      </Link>
      <ul className="mt-4 grid gap-px">
        {families.map((f) => (
          <li key={f.slug}>
            <Link
              href={`/products/${f.slug}` as never}
              className="group flex items-baseline justify-between border-b border-line py-2 text-[0.8125rem] text-ink-2 transition-colors duration-300 hover:text-accent"
            >
              <span>{f.name}</span>
              <span className="t-mono text-[0.625rem] text-ink-4 transition-colors group-hover:text-accent">
                {f.products.length}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Header;
