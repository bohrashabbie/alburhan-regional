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
  ArrowUp,
  CheckCircle,
  AlertCircle,
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
  useBrands,
  useSiteContent,
} from '@/context/SiteContentContext';
import { useReveal } from '@/hooks/useReveal';
import { MarqueeRow } from './motion/MarqueeRow';

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

const Footer: React.FC = () => {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const allContacts = useContactInfo();
  const countries = useCountries();
  const socialLinksRaw = useSocialLinks();
  const brands = useBrands();
  const { setting } = useSiteContent();

  const { ref: bodyRef, visible: bodyVisible } = useReveal(0.05);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = React.useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = React.useState(false);
  const [newsletterError, setNewsletterError] = React.useState('');
  const emailValid = newsletterEmail.length > 0 && isValidEmail(newsletterEmail);
  const emailInvalid = newsletterEmail.length > 0 && !isValidEmail(newsletterEmail);

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
        slug: string; country: any; name: string; email?: string; phone?: string; address?: string;
      }>;
  }, [allContacts, countries, isRTL]);

  const socials = React.useMemo(() => {
    if (socialLinksRaw.length > 0) {
      return socialLinksRaw.map((s) => ({
        icon: platformIcon(s.platform), href: s.url, label: s.platform,
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
    { href: '/contact', label: t('header.contact') },
  ];

  const headOfficeEmail = t('contact.emailValue');
  const headOfficePhone = t('contact.phone1');
  const headOfficeAddress = t('contact.addressLine');
  const headOfficeHours = t('contact.hours');

  return (
    <footer
      className="relative mt-auto overflow-hidden bg-[#050505]"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Gold hairline top */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #D4A843, transparent)' }}
      />

      {/* Brand marquee strip */}
      {brands && brands.length > 0 && (
        <div className="border-b border-[#1A1A1A] py-6">
          <MarqueeRow speed={55} fade>
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
                  className="flex h-12 w-32 shrink-0 items-center justify-center rounded-md border border-[#1A1A1A] bg-white/[0.04] p-2 opacity-80 transition-all duration-300 hover:border-[#D4A843]/30 hover:opacity-100"
                >
                  <Image
                    src={img}
                    alt={b.name || 'Brand'}
                    width={110}
                    height={40}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain"
                  />
                </Tag>
              );
            })}
          </MarqueeRow>
        </div>
      )}

      <div
        ref={bodyRef}
        className="mx-auto w-full max-w-7xl px-4 pt-14 pb-10 sm:px-6 lg:px-8"
        style={{
          opacity: bodyVisible ? 1 : 0,
          transform: bodyVisible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Newsletter */}
        <div className="mb-14 border border-[#1A1A1A] p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-md">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#D4A843]">
                {isRTL ? 'ابقَ مضيئاً' : 'Stay illuminated'}
              </p>
              <h3 className="mt-3 font-display text-[1.5rem] font-light leading-tight text-white">
                {isRTL ? 'اشترك في نشرتنا البريدية' : 'Subscribe to our newsletter'}
              </h3>
              <p className="mt-2 text-[13px] font-light text-[#444]">
                {isRTL
                  ? 'رؤى شهرية حول تصميم الإضاءة والمشاريع.'
                  : 'Monthly insights on lighting design and new installations.'}
              </p>
            </div>
            <div className="w-full max-w-sm">
              {newsletterSubmitted ? (
                <div className="flex items-center gap-3 border border-green-900/40 bg-green-900/10 px-5 py-3 text-[13px] text-green-400">
                  <CheckCircle className="size-4 shrink-0" />
                  {isRTL ? 'شكراً! تم تسجيلك بنجاح.' : "Thanks! You're subscribed."}
                </div>
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
                  className={cn(
                    'flex items-center gap-0 border transition-all duration-300',
                    emailInvalid ? 'border-red-900/60' : emailValid ? 'border-green-900/60' : 'border-[#1A1A1A] focus-within:border-[#D4A843]/40',
                  )}
                >
                  <Mail
                    className={cn(
                      'mx-3 size-3.5 shrink-0',
                      emailValid ? 'text-green-400' : emailInvalid ? 'text-red-400' : 'text-[#444]',
                    )}
                  />
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => { setNewsletterEmail(e.target.value); setNewsletterError(''); }}
                    placeholder={isRTL ? 'بريدك@الإلكتروني.com' : 'your@email.com'}
                    required
                    className="flex-1 bg-transparent py-3 text-[13px] font-light text-white placeholder:text-[#333] focus:outline-none"
                  />
                  {emailValid && <CheckCircle className="mx-2 size-3.5 shrink-0 text-green-400" />}
                  {emailInvalid && <AlertCircle className="mx-2 size-3.5 shrink-0 text-red-400" />}
                  <button
                    type="submit"
                    className="flex items-center gap-2 border-l border-[#1A1A1A] bg-[#D4A843] px-4 py-3 text-[11px] uppercase tracking-[0.15em] text-black transition-colors hover:bg-[#C49730]"
                  >
                    <Send className="size-3.5" />
                    <span className="hidden sm:inline">{isRTL ? 'اشترك' : 'Subscribe'}</span>
                  </button>
                </form>
              )}
              {newsletterError && (
                <p className="mt-2 flex items-center gap-1.5 text-[11px] text-red-400">
                  <AlertCircle className="size-3" />
                  {newsletterError}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand block */}
          <div className="md:col-span-4">
            <Link href="/" className="inline-block">
              <span className="font-display text-xl font-light tracking-wide text-[#D4A843]">
                {t('common.companyName')}
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-[13px] font-light leading-relaxed text-[#444]">
              {setting('footer_description') || t('footer.description')}
            </p>

            <div className="mt-6 space-y-3">
              {[
                { icon: Mail, value: headOfficeEmail, href: `mailto:${headOfficeEmail}` },
                { icon: Phone, value: headOfficePhone, href: `tel:${headOfficePhone.replace(/\s+/g, '')}` },
                { icon: MapPin, value: headOfficeAddress, href: null },
                { icon: Clock, value: headOfficeHours, href: null },
              ].map(({ icon: Icon, value, href }) => (
                <div key={value} className="flex items-start gap-3">
                  <Icon className="mt-0.5 size-3.5 shrink-0 text-[#D4A843]" />
                  {href ? (
                    <a href={href} className="text-[12px] font-light text-[#444] transition-colors hover:text-white">
                      {value}
                    </a>
                  ) : (
                    <span className="text-[12px] font-light text-[#444]">{value}</span>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {socials.map((s, i) => (
                <a
                  key={`${s.label}-${i}`}
                  href={s.href || '#'}
                  target={s.href && s.href !== '#' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid size-9 place-items-center border border-[#1A1A1A] text-[#444] transition-all duration-300 hover:border-[#D4A843]/40 hover:text-[#D4A843]"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-2">
            <h4 className="mb-5 font-mono text-[9px] uppercase tracking-[0.3em] text-[#D4A843]">
              {isRTL ? 'روابط سريعة' : 'Navigate'}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href as any}
                    className="text-[12px] font-light text-[#444] transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Branches */}
          <div className="md:col-span-6">
            <h4 className="mb-5 font-mono text-[9px] uppercase tracking-[0.3em] text-[#D4A843]">
              {isRTL ? 'تواجدنا' : 'Our Presence'}
            </h4>
            <div className="grid gap-3 sm:grid-cols-2">
              {branches.map((b) => (
                <Link
                  key={b.slug}
                  href={`/${b.slug}` as any}
                  className="group border border-[#1A1A1A] p-4 transition-all duration-300 hover:border-[#D4A843]/30"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-[13px] font-light text-white transition-colors group-hover:text-[#D4A843]">
                      {b.name}
                    </p>
                    <ArrowUpRight className="size-3.5 text-[#333] transition-all group-hover:text-[#D4A843]" />
                  </div>
                  <div className="mt-2 space-y-1">
                    {isValidContact(b.phone) && (
                      <div className="flex items-center gap-1.5 text-[11px] font-light text-[#444]">
                        <Phone className="size-3 shrink-0 text-[#D4A843]" /> {b.phone}
                      </div>
                    )}
                    {isValidContact(b.email) && (
                      <div className="flex items-center gap-1.5 text-[11px] font-light text-[#444]">
                        <Mail className="size-3 shrink-0 text-[#D4A843]" />
                        <span className="truncate">{b.email}</span>
                      </div>
                    )}
                    {isValidContact(b.address) && (
                      <div className="flex items-start gap-1.5 text-[11px] font-light text-[#444]">
                        <MapPin className="mt-0.5 size-3 shrink-0 text-[#D4A843]" />
                        <span className="line-clamp-2">{b.address}</span>
                      </div>
                    )}
                    {!isValidContact(b.phone) && !isValidContact(b.email) && !isValidContact(b.address) && (
                      <span className="inline-flex items-center border border-[#D4A843]/20 px-2 py-0.5 font-mono text-[8px] uppercase tracking-widest text-[#D4A843]/60">
                        {isRTL ? 'قريباً' : 'Coming soon'}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#1A1A1A]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-[11px] font-light text-[#333] sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {t('common.companyName')}. {t('footer.copyright')}.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            {legalLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href as any}
                className="transition-colors hover:text-white"
              >
                {l.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label={isRTL ? 'العودة للأعلى' : 'Back to top'}
              className="flex items-center gap-1.5 transition-colors hover:text-[#D4A843]"
            >
              <ArrowUp className="size-3" />
              <span>{isRTL ? 'للأعلى' : 'Top'}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
