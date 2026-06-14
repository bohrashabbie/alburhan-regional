'use client';

import * as React from 'react';
import Image from 'next/image';
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

import { useReveal } from '@/hooks/useReveal';
import { useCountries, useContactInfo } from '@/context/SiteContentContext';
import { getImageUrl } from '@/lib/api';
import { cn } from '@/lib/utils';

const isValidContact = (v: string | null | undefined): v is string =>
  typeof v === 'string' && v.length > 0 && !/(to be added|information|placeholder)/i.test(v);

const FALLBACKS: Record<string, string> = {
  china: 'https://images.unsplash.com/photo-1545893835-abaa50cbe628?auto=format&fit=crop&w=1200&q=80',
  kuwait: 'https://images.unsplash.com/photo-1578895104528-1daa6f2a5d4b?auto=format&fit=crop&w=1200&q=80',
  uae: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
  egypt: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73b0b?auto=format&fit=crop&w=1200&q=80',
};

export function PresenceSection() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const countries = useCountries();
  const allContacts = useContactInfo();

  const { ref: headRef, visible: headVisible } = useReveal(0.3);
  const { ref: gridRef, visible: gridVisible } = useReveal(0.1);

  const ordered = React.useMemo(() => {
    const order = ['uae', 'kuwait', 'china', 'egypt'];
    const map = new Map(countries.map((c) => [c.slug, c]));
    return order.map((s) => map.get(s)).filter(Boolean) as typeof countries;
  }, [countries]);

  return (
    <section
      className="luxury-section relative bg-[#080808] py-24 md:py-32"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[#1A1A1A]" />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div
          ref={headRef}
          className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
          style={{
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#D4A843]">
              {isRTL ? 'وجودنا' : 'Global presence'}
            </p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] font-light leading-[1.1] tracking-[-0.02em] text-white">
              {t('sections.aboutUs')}
            </h2>
          </div>
          <p className="max-w-sm text-[14px] font-light leading-relaxed text-[#444]">
            {isRTL
              ? 'أربع دول. فريق واحد. حلول إضاءة متكاملة تمتد من الخليج إلى آسيا وشمال أفريقيا.'
              : 'Four countries. One team. Integrated lighting from the Gulf to Asia and North Africa.'}
          </p>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid gap-[1px] bg-[#1A1A1A] sm:grid-cols-2 lg:grid-cols-4"
        >
          {ordered.map((c, idx) => {
            const slug = c.slug;
            const name = isRTL ? c.name_ar || c.name_en : c.name_en;
            const firm = isRTL ? c.firm_name_ar || c.firm_name_en : c.firm_name_en;
            const img = getImageUrl(c.country_image_url) || FALLBACKS[slug] || FALLBACKS.uae;
            const href = `/${slug}` as any;
            const ci = allContacts.find((x) => x.country_id === c.id);

            return (
              <Link
                key={c.id}
                href={href}
                className={cn(
                  'group relative flex h-[340px] flex-col justify-end overflow-hidden bg-[#0C0C0C] p-6',
                  'transition-all duration-500',
                  'hover:z-10',
                )}
                style={{
                  opacity: gridVisible ? 1 : 0,
                  transform: gridVisible ? 'translateY(0)' : 'translateY(32px)',
                  transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${idx * 80}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${idx * 80}ms`,
                }}
              >
                {/* Background image */}
                <Image
                  src={img}
                  alt={name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  loading="lazy"
                />

                {/* Scrim */}
                <div
                  aria-hidden
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(8,8,8,0.97) 0%, rgba(8,8,8,0.7) 45%, rgba(8,8,8,0.1) 100%)',
                  }}
                />

                {/* Gold border on hover */}
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ boxShadow: 'inset 0 0 0 0.5px #D4A843' }}
                />

                {/* Country pin — top */}
                <div className="absolute left-5 top-5 z-10 flex items-center gap-1.5">
                  <MapPin className="size-3 text-[#D4A843]" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#D4A843]">
                    {slug.toUpperCase()}
                  </span>
                </div>

                {/* Arrow — top right */}
                <ArrowUpRight
                  className="absolute right-5 top-5 z-10 size-4 text-[#333] transition-all duration-300 group-hover:text-[#D4A843] group-hover:rotate-0"
                  style={{ transform: 'rotate(0deg)' }}
                />

                {/* Content — bottom */}
                <div className="relative z-10">
                  <h3 className="font-display text-[1.4rem] font-light uppercase tracking-[0.04em] text-white transition-colors duration-300 group-hover:text-[#D4A843]">
                    {name}
                  </h3>
                  {firm && (
                    <p className="mt-1 text-[11px] font-light text-[#555]">{firm}</p>
                  )}

                  {/* Contact */}
                  <div className="mt-3 flex flex-col gap-1.5">
                    {isValidContact(ci?.phone1) && (
                      <span className="flex items-center gap-1.5 text-[10px] text-[#444]">
                        <Phone className="size-3 shrink-0 text-[#D4A843]" />
                        {ci!.phone1}
                      </span>
                    )}
                    {isValidContact(ci?.email) && (
                      <span className="flex items-center gap-1.5 text-[10px] text-[#444]">
                        <Mail className="size-3 shrink-0 text-[#D4A843]" />
                        {ci!.email}
                      </span>
                    )}
                    {!isValidContact(ci?.phone1) && !isValidContact(ci?.email) && (
                      <span className="inline-flex w-fit items-center rounded-sm border border-[#D4A843]/20 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-[#D4A843]/60">
                        {isRTL ? 'قريباً' : 'Coming soon'}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {ordered.length === 0 && (
          <div className="py-16 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-[#333]">
            Loading…
          </div>
        )}
      </div>
    </section>
  );
}

export default PresenceSection;
