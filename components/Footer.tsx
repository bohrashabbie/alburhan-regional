'use client';

import React from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  ArrowUpRight,
  CheckCircle,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import {
  IconFacebook,
  IconInstagram,
  IconLinkedIn,
  IconX,
  IconYouTube,
} from './icons/SocialIcons';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';

import { cn } from '@/lib/utils';
import { getImageUrl } from '@/lib/api';
import {
  useContactInfo,
  useCountries,
  useSocialLinks,
  useSiteContent,
} from '@/context/SiteContentContext';
import { useReveal } from '@/hooks/useReveal';
import { CATALOG } from '@/lib/catalog/ms-lighting';

const isValidContact = (v: string | null | undefined): v is string =>
  typeof v === 'string' && v.length > 0 && !/(to be added|information|placeholder)/i.test(v);

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const platformIcon = (platform: string) => {
  const p = (platform || '').toLowerCase();
  if (p.includes('face')) return <IconFacebook className="size-4" />;
  if (p.includes('twit') || p === 'x') return <IconX className="size-4" />;
  if (p.includes('insta')) return <IconInstagram className="size-4" />;
  if (p.includes('linke')) return <IconLinkedIn className="size-4" />;
  if (p.includes('you')) return <IconYouTube className="size-4" />;
  return <Globe className="size-4" />;
};

/**
 * Footer, structured as a site index rather than a decorative slab: the
 * newsletter ask first, then four link columns, then the branch ledger with
 * real addresses and numbers, then the legal bar. Everything is ruled with
 * hairlines so it reads as a printed colophon in both themes.
 */
const Footer: React.FC = () => {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const allContacts = useContactInfo();
  const countries = useCountries();
  const socialLinksRaw = useSocialLinks();
  const { setting } = useSiteContent();

  const { ref: bodyRef, visible: bodyVisible } = useReveal(0.05);

  const [newsletterEmail, setNewsletterEmail] = React.useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = React.useState(false);
  const [newsletterError, setNewsletterError] = React.useState('');
  const emailValid = newsletterEmail.length > 0 && isValidEmail(newsletterEmail);
  const emailInvalid = newsletterEmail.length > 0 && !isValidEmail(newsletterEmail);

  const logoSrc =
    getImageUrl(setting('logo_url', isRTL ? 'ar' : 'en')) || '/logo/AL BURHAN GROUP .png';

  const branches = React.useMemo(() => {
    const slugs = ['kuwait', 'uae', 'china', 'egypt'];
    return slugs
      .map((slug) => {
        const country = countries.find((c) => c.slug === slug);
        if (!country) return null;
        const ci = allContacts.find((c) => c.country_id === country.id);
        return {
          slug,
          name: (isRTL ? country.name_ar || country.name_en : country.name_en) || '',
          firm: isRTL ? country.firm_name_ar || country.firm_name_en : country.firm_name_en,
          email: ci?.email,
          phone: ci?.phone1,
          address: isRTL
            ? (ci as { address_ar?: string } | undefined)?.address_ar || ci?.address_en
            : ci?.address_en,
        };
      })
      .filter(Boolean) as {
        slug: string;
        name: string;
        firm?: string | null;
        email?: string | null;
        phone?: string | null;
        address?: string | null;
      }[];
  }, [allContacts, countries, isRTL]);

  const socials = React.useMemo(() => {
    if (socialLinksRaw.length > 0) {
      return socialLinksRaw.map((s) => ({
        icon: platformIcon(s.platform),
        href: s.url,
        label: s.platform,
      }));
    }
    return [
      { icon: <IconFacebook className="size-4" />, href: '#', label: 'Facebook' },
      { icon: <IconInstagram className="size-4" />, href: '#', label: 'Instagram' },
      { icon: <IconLinkedIn className="size-4" />, href: '#', label: 'LinkedIn' },
    ];
  }, [socialLinksRaw]);

  const columns = [
    {
      title: isRTL ? 'الشركة' : 'Company',
      links: [
        { href: '/about', label: t('header.aboutUs') },
        { href: '/projects', label: t('header.ourProjects') },
        { href: '/services', label: t('header.services') },
        { href: '/case-studies', label: isRTL ? 'دراسات حالة' : 'Case studies' },
        { href: '/careers', label: isRTL ? 'الوظائف' : 'Careers' },
        { href: '/contact', label: t('header.contact') },
      ],
    },
    {
      title: isRTL ? 'داخلي' : 'Indoor',
      links: CATALOG.filter((f) => f.zone === 'indoor')
        .slice(0, 6)
        .map((f) => ({ href: `/products/${f.slug}`, label: f.name })),
    },
    {
      title: isRTL ? 'خارجي' : 'Outdoor',
      links: CATALOG.filter((f) => f.zone === 'outdoor').map((f) => ({
        href: `/products/${f.slug}`,
        label: f.name,
      })),
    },
  ];

  const legalLinks = [
    { href: '/privacy', label: t('footer.legal.privacy') },
    { href: '/terms', label: t('footer.legal.terms') },
    { href: '/cookies', label: t('footer.legal.cookies') },
  ];

  return (
    <footer className="relative mt-auto border-t border-line bg-surface" dir={isRTL ? 'rtl' : 'ltr'}>
      <div ref={bodyRef} className="wrap">
        {/* ── Newsletter ── */}
        <div
          className="grid gap-8 border-b border-line py-12 md:grid-cols-[1fr_auto] md:items-center"
          style={{
            opacity: bodyVisible ? 1 : 0,
            transform: bodyVisible ? 'none' : 'translateY(18px)',
            transition: 'opacity 0.9s var(--ease-out-expo), transform 0.9s var(--ease-out-expo)',
          }}
        >
          <div className="max-w-md">
            <p className="kicker">{isRTL ? 'النشرة البريدية' : 'Newsletter'}</p>
            <h3 className="t-h2 mt-4">
              {isRTL ? 'مشاريع وأجهزة جديدة، شهرياً' : 'New projects and fixtures, monthly'}
            </h3>
          </div>

          <div className="w-full md:w-96">
            {newsletterSubmitted ? (
              <p className="flex items-center gap-3 border border-line bg-canvas px-5 py-4 text-[0.875rem] text-ink">
                <CheckCircle className="size-4 shrink-0 text-accent" />
                {isRTL ? 'شكراً! تم تسجيلك بنجاح.' : 'Thanks — you’re on the list.'}
              </p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!isValidEmail(newsletterEmail)) {
                    setNewsletterError(
                      isRTL ? 'يرجى إدخال بريد إلكتروني صحيح' : 'Please enter a valid email',
                    );
                    return;
                  }
                  setNewsletterError('');
                  setNewsletterSubmitted(true);
                }}
              >
                <div
                  className={cn(
                    'flex items-center border bg-canvas transition-colors duration-300',
                    emailInvalid
                      ? 'border-accent'
                      : 'border-line focus-within:border-accent',
                  )}
                >
                  <Mail className="mx-3 size-4 shrink-0 text-ink-4" />
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => {
                      setNewsletterEmail(e.target.value);
                      setNewsletterError('');
                    }}
                    placeholder={isRTL ? 'بريدك@الإلكتروني.com' : 'your@email.com'}
                    required
                    aria-label={isRTL ? 'البريد الإلكتروني' : 'Email address'}
                    className="min-w-0 flex-1 bg-transparent py-3.5 text-[0.875rem] text-ink outline-none placeholder:text-ink-4"
                  />
                  {emailValid && <CheckCircle className="mx-2 size-4 shrink-0 text-accent" />}
                  {emailInvalid && <AlertCircle className="mx-2 size-4 shrink-0 text-accent" />}
                  <button
                    type="submit"
                    aria-label={isRTL ? 'اشترك' : 'Subscribe'}
                    className="flex h-12 items-center gap-2 bg-accent px-5 text-[0.8125rem] font-medium text-accent-ink transition-opacity hover:opacity-90"
                  >
                    <span className="hidden sm:inline">{isRTL ? 'اشترك' : 'Subscribe'}</span>
                    <ArrowRight className={cn('size-4', isRTL && 'rotate-180')} />
                  </button>
                </div>
                {newsletterError && (
                  <p className="mt-2 text-[0.75rem] text-accent">{newsletterError}</p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* ── Index ── */}
        <div className="grid gap-10 border-b border-line py-12 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Link href="/" className="relative block h-10 w-44">
              <Image
                src={logoSrc}
                alt="Al-Burhan Group"
                fill
                sizes="176px"
                loading="lazy"
                style={{
                  objectFit: 'contain',
                  objectPosition: isRTL ? 'right center' : 'left center',
                }}
              />
            </Link>
            <p className="t-small mt-5 max-w-xs">
              {isRTL
                ? 'حلول إضاءة معمارية للمشاريع — من التصميم والتصنيع إلى التوريد والتركيب في الكويت والإمارات والصين ومصر.'
                : 'Architectural lighting for projects — specified, manufactured, supplied and installed across Kuwait, the UAE, China and Egypt.'}
            </p>

            <a
              href="https://mslighting.alburhan-regional.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-2 border border-line bg-canvas px-4 py-2.5 text-[0.8125rem] text-ink-2 transition-colors hover:border-accent hover:text-accent"
            >
              <span className="t-mono text-[0.5625rem] text-ink-4">
                {isRTL ? 'مصنعنا' : 'Our factory'}
              </span>
              <span className="font-medium">MS Lighting</span>
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            <div className="mt-6 flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex size-9 items-center justify-center border border-line text-ink-3 transition-colors duration-300 hover:border-accent hover:text-accent"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="t-mono text-[0.5625rem] text-ink-4">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href as never}
                      className="text-[0.8125rem] text-ink-2 transition-colors duration-300 hover:text-accent"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* ── Branch ledger ── */}
        <div className="grid gap-px border-b border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {branches.map((b) => (
            <div key={b.slug} className="bg-surface py-8 sm:px-6 sm:first:ps-0">
              <p className="t-mono text-[0.5625rem] text-accent">{b.slug.toUpperCase()}</p>
              <p className="mt-2 text-[0.9375rem] font-medium text-ink">{b.firm || b.name}</p>
              {isValidContact(b.address) && (
                <p className="t-small mt-2 flex items-start gap-2">
                  <MapPin className="mt-0.5 size-3.5 shrink-0 text-ink-4" />
                  <span>{b.address}</span>
                </p>
              )}
              {isValidContact(b.phone) && (
                <a
                  href={`tel:${b.phone.replace(/\s/g, '')}`}
                  className="t-small mt-1.5 flex items-center gap-2 transition-colors hover:text-accent"
                >
                  <Phone className="size-3.5 shrink-0 text-ink-4" />
                  {b.phone}
                </a>
              )}
              {isValidContact(b.email) && (
                <a
                  href={`mailto:${b.email}`}
                  className="t-small mt-1.5 flex items-center gap-2 break-all transition-colors hover:text-accent"
                >
                  <Mail className="size-3.5 shrink-0 text-ink-4" />
                  {b.email}
                </a>
              )}
              {!isValidContact(b.phone) && !isValidContact(b.email) && (
                <span className="chip mt-3">{isRTL ? 'قريباً' : 'Coming soon'}</span>
              )}
            </div>
          ))}
        </div>

        {/* ── Legal bar ── */}
        <div className="flex flex-col items-start justify-between gap-4 py-7 md:flex-row md:items-center">
          <p className="t-mono text-[0.5625rem] text-ink-4">
            © {new Date().getFullYear()} {t('common.companyName')} · {t('common.allRightsReserved')}
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href as never}
                  className="text-[0.75rem] text-ink-3 transition-colors duration-300 hover:text-accent"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
