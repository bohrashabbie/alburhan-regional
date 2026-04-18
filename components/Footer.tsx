'use client';

import React from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  ArrowUpRight,
  Globe,
} from 'lucide-react';
import {
  IconFacebook,
  IconInstagram,
  IconLinkedIn,
  IconX,
  IconYouTube,
} from './icons/SocialIcons';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';

import { cn } from '@/lib/utils';
import { getImageUrl } from '@/lib/api';
import {
  useContactInfo,
  useCountries,
  useSocialLinks,
  useBrands,
  useSiteContent,
} from '@/context/SiteContentContext';
import { ScrollReveal } from './motion/ScrollReveal';
import { MarqueeRow } from './motion/MarqueeRow';
import { NeonButton } from './fx/NeonButton';
import { GradientText } from './fx/GradientText';

const platformIcon = (platform: string) => {
  const p = (platform || '').toLowerCase();
  if (p.includes('face')) return <IconFacebook className="size-4" />;
  if (p.includes('twit') || p === 'x') return <IconX className="size-4" />;
  if (p.includes('insta')) return <IconInstagram className="size-4" />;
  if (p.includes('linke')) return <IconLinkedIn className="size-4" />;
  if (p.includes('you')) return <IconYouTube className="size-4" />;
  return <Globe className="size-4" />;
};

const Footer: React.FC = () => {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const allContacts = useContactInfo();
  const countries = useCountries();
  const socialLinksRaw = useSocialLinks();
  const brands = useBrands();
  const { setting } = useSiteContent();

  const branches = React.useMemo(() => {
    const slugs = ['uae', 'kuwait', 'china', 'egypt'];
    return slugs
      .map((slug) => {
        const country = countries.find((c) => c.slug === slug);
        if (!country) return null;
        const ci = allContacts.find((c) => c.country_id === country.id);
        return {
          slug,
          country,
          name: isRTL ? country.name_ar || country.name_en : country.name_en,
          email: ci?.email,
          phone: ci?.phone1,
          address: isRTL
            ? (ci as any)?.address_ar || ci?.address_en
            : ci?.address_en,
        };
      })
      .filter(Boolean) as Array<{
      slug: string;
      country: any;
      name: string;
      email?: string;
      phone?: string;
      address?: string;
    }>;
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

  const legalLinks = [
    { href: '/privacy', label: t('footer.legal.privacy') },
    { href: '/terms', label: t('footer.legal.terms') },
    { href: '/cookies', label: t('footer.legal.cookies') },
  ];

  const quickLinks = [
    { href: '/', label: t('header.home') },
    { href: '/about', label: t('header.aboutUs') },
    { href: '/projects', label: t('header.ourProjects') },
    { href: '/services', label: t('header.services') },
    { href: '/products', label: t('header.ourProducts') },
    { href: '/case-studies', label: 'Case Studies' },
    { href: '/careers', label: 'Careers' },
    { href: '/contact', label: t('header.contact') },
  ];

  const headOfficeEmail = t('contact.emailValue');
  const headOfficePhone = t('contact.phone1');
  const headOfficeAddress = t('contact.addressLine');
  const headOfficeHours = t('contact.hours');

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-[color:var(--glass-border)]">
      {/* Top gradient hairline */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(201,169,79,0.65), transparent)',
        }}
      />

      {/* Background */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(180deg, rgba(7,7,11,0.4) 0%, rgba(12,11,19,0.95) 40%, rgba(7,7,11,1) 100%)',
        }}
      />

      {/* Brand marquee */}
      {brands && brands.length > 0 && (
        <div className="relative border-b border-[color:var(--glass-border)] py-8">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 opacity-40"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(201,169,79,0.5), transparent)',
            }}
          />
          <MarqueeRow speed={55}>
            {brands.map((b) => {
              const img = getImageUrl(b.logo_url);
              if (!img) return null;
              const Tag: React.ElementType = b.website_url ? 'a' : 'div';
              const linkProps = b.website_url
                ? { href: b.website_url, target: '_blank', rel: 'noopener noreferrer' }
                : {};
              return (
                <Tag
                  key={b.id}
                  {...linkProps}
                  aria-label={b.name || 'Brand'}
                  className="group relative block h-14 w-36 shrink-0 transition-transform duration-500 hover:-translate-y-0.5 hover:scale-105"
                >
                  <Image
                    src={img}
                    alt={b.name || 'Brand'}
                    fill
                    sizes="144px"
                    unoptimized
                    className="object-contain"
                  />
                </Tag>
              );
            })}
          </MarqueeRow>
        </div>
      )}

      <div className="mx-auto w-full max-w-7xl px-4 pt-16 pb-10 sm:px-6 lg:px-8">
        {/* Newsletter */}
        <ScrollReveal className="mb-14">
          <div className="relative overflow-hidden rounded-3xl border border-[color:var(--glass-border)] glass-surface p-8 md:p-10">
            <div
              aria-hidden
              className="absolute -inset-20 -z-10 opacity-60"
              style={{
                background:
                  'radial-gradient(closest-side, rgba(194,50,74,0.4), transparent 70%)',
              }}
            />
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-lg">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--brand-gold)]">
                  Stay illuminated
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold md:text-3xl">
                  <GradientText>Subscribe</GradientText> to our newsletter
                </h3>
                <p className="mt-2 text-sm text-[color:var(--fg-muted)]">
                  Monthly insights on lighting design, new installations and industry trends.
                </p>
              </div>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex w-full max-w-md items-center gap-2 rounded-full border border-[color:var(--glass-border)] bg-white/[0.03] p-1.5 focus-within:border-[color:var(--brand-gold)]"
              >
                <Mail className="ml-3 size-4 shrink-0 text-[color:var(--brand-gold)]" />
                <input
                  type="email"
                  placeholder="your@email.com"
                  required
                  className="flex-1 bg-transparent px-2 py-2 text-sm text-[color:var(--fg-default)] placeholder:text-[color:var(--fg-subtle)] focus:outline-none"
                />
                <NeonButton type="submit" size="sm" className="shrink-0">
                  <Send className="size-4" />
                  <span className="hidden sm:inline">Subscribe</span>
                </NeonButton>
              </form>
            </div>
          </div>
        </ScrollReveal>

        {/* Main grid */}
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand block */}
          <div className="md:col-span-4">
            <Link href="/" className="inline-block">
              <GradientText
                as="span"
                className="font-display text-2xl font-bold tracking-tight"
              >
                {t('common.companyName')}
              </GradientText>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[color:var(--fg-muted)]">
              {setting('footer_description') || t('footer.description')}
            </p>

            <div className="mt-6 space-y-3 text-sm text-[color:var(--fg-muted)]">
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-[color:var(--brand-gold)]" />
                <a href={`mailto:${headOfficeEmail}`} className="hover:text-[color:var(--fg-default)]">
                  {headOfficeEmail}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-[color:var(--brand-gold)]" />
                <a href={`tel:${headOfficePhone.replace(/\s+/g, '')}`} className="hover:text-[color:var(--fg-default)]">
                  {headOfficePhone}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-[color:var(--brand-gold)]" />
                <span>{headOfficeAddress}</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-[color:var(--brand-gold)]" />
                <span>{headOfficeHours}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {socials.map((s, i) => (
                <motion.a
                  key={`${s.label}-${i}`}
                  href={s.href || '#'}
                  target={s.href && s.href !== '#' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ y: -3 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 18 }}
                  className={cn(
                    'grid size-10 place-items-center rounded-full',
                    'border border-[color:var(--glass-border)] text-[color:var(--fg-default)]',
                    'transition-colors duration-300',
                    'hover:border-[color:var(--brand-gold)] hover:text-[color:var(--brand-gold-bright)] hover:bg-[rgba(201,169,79,0.06)]',
                  )}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-2">
            <h4 className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--brand-gold)]">
              Navigate
            </h4>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href as any}
                    className="group inline-flex items-center gap-1 text-[color:var(--fg-muted)] transition-colors hover:text-[color:var(--brand-gold-bright)]"
                  >
                    <ArrowUpRight className="size-3 -rotate-45 transition-transform group-hover:rotate-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Branches */}
          <div className="md:col-span-6">
            <h4 className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--brand-gold)]">
              Our Presence
            </h4>
            <div className="grid gap-4 sm:grid-cols-2">
              {branches.map((b) => (
                <Link
                  key={b.slug}
                  href={`/${b.slug}` as any}
                  className="group relative overflow-hidden rounded-2xl border border-[color:var(--glass-border)] bg-white/[0.02] p-4 transition-colors duration-300 hover:border-[color:var(--brand-gold)]"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-16 -top-16 size-32 rounded-full opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-80"
                    style={{
                      background:
                        'radial-gradient(closest-side, rgba(194,50,74,0.55), transparent 70%)',
                    }}
                  />
                  <div className="flex items-center justify-between">
                    <p className="font-display text-lg font-semibold text-[color:var(--fg-default)] group-hover:text-[color:var(--brand-gold-bright)]">
                      {b.name}
                    </p>
                    <ArrowUpRight className="size-4 text-[color:var(--fg-subtle)] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[color:var(--brand-gold)]" />
                  </div>
                  <div className="mt-2 space-y-1 text-xs text-[color:var(--fg-muted)]">
                    {b.phone && (
                      <div className="flex items-center gap-1.5">
                        <Phone className="size-3" /> {b.phone}
                      </div>
                    )}
                    {b.email && (
                      <div className="flex items-center gap-1.5 truncate">
                        <Mail className="size-3" /> <span className="truncate">{b.email}</span>
                      </div>
                    )}
                    {b.address && (
                      <div className="flex items-start gap-1.5">
                        <MapPin className="mt-0.5 size-3 shrink-0" />{' '}
                        <span className="line-clamp-2">{b.address}</span>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[color:var(--glass-border)]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-[color:var(--fg-subtle)] sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {t('common.companyName')}. {t('footer.copyright')}.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {legalLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href as any}
                className="transition-colors hover:text-[color:var(--brand-gold-bright)]"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
