'use client';

import * as React from 'react';
import Image from 'next/image';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { GradientText } from '@/components/fx/GradientText';
import { TiltCard } from '@/components/fx/TiltCard';
import { GlassCard } from '@/components/fx/GlassCard';
import { useCountries } from '@/context/SiteContentContext';
import { getImageUrl } from '@/lib/api';
import { cn } from '@/lib/utils';

const FALLBACKS: Record<string, string> = {
  china: 'https://images.unsplash.com/photo-1545893835-abaa50cbe628?auto=format&fit=crop&w=1200&q=80',
  kuwait: 'https://images.unsplash.com/photo-1578895104528-1daa6f2a5d4b?auto=format&fit=crop&w=1200&q=80',
  uae: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
  egypt: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73b0b?auto=format&fit=crop&w=1200&q=80',
};

// Visual footprint — each country gets a distinct grid area for a bento feel.
const LAYOUT: Record<string, string> = {
  uae: 'md:col-span-6 md:row-span-2',
  kuwait: 'md:col-span-3 md:row-span-1',
  china: 'md:col-span-3 md:row-span-1',
  egypt: 'md:col-span-6 md:row-span-1',
};

export function PresenceSection() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const countries = useCountries();

  const ordered = React.useMemo(() => {
    const order = ['uae', 'kuwait', 'china', 'egypt'];
    const map = new Map(countries.map((c) => [c.slug, c]));
    return order.map((s) => map.get(s)).filter(Boolean) as typeof countries;
  }, [countries]);

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <ScrollReveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--brand-gold)]">
              {isRTL ? 'وجودنا' : 'Global presence'}
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold leading-tight md:text-5xl">
              <GradientText>{t('sections.aboutUs')}</GradientText>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="max-w-md text-sm text-[color:var(--fg-muted)] md:text-base">
              {isRTL
                ? 'أربع دول. فريق واحد. حلول إضاءة متكاملة تمتد من الخليج إلى آسيا وشمال أفريقيا.'
                : 'Four countries. One team. Integrated lighting delivered from the Gulf to Asia and North Africa.'}
            </p>
          </ScrollReveal>
        </div>

        <div className="grid auto-rows-[260px] gap-4 md:grid-cols-6 md:gap-5">
          {ordered.map((c, idx) => {
            const slug = c.slug;
            const name = isRTL ? c.name_ar || c.name_en : c.name_en;
            const firm = isRTL ? c.firm_name_ar || c.firm_name_en : c.firm_name_en;
            const img = getImageUrl(c.country_image_url) || FALLBACKS[slug] || FALLBACKS.uae;
            const layout = LAYOUT[slug] || 'md:col-span-3';
            const href = `/${slug === 'uae' ? 'uae' : slug}` as any;

            return (
              <ScrollReveal
                key={c.id}
                delay={0.05 * idx}
                className={cn('h-full', layout)}
              >
                <TiltCard max={6} scale={1.02} className="h-full">
                  <Link
                    href={href}
                    data-cursor-label={name}
                    className="group relative block h-full overflow-hidden rounded-3xl border border-[color:var(--glass-border)]"
                  >
                    <Image
                      src={img}
                      alt={name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="size-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.08]"
                      unoptimized
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 transition-opacity duration-500"
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(7,7,11,0.2) 0%, rgba(7,7,11,0.6) 60%, rgba(7,7,11,0.95) 100%)',
                      }}
                    />
                    {/* Neon frame on hover */}
                    <div
                      aria-hidden
                      className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        boxShadow:
                          'inset 0 0 0 1px rgba(201,169,79,0.45), 0 0 40px rgba(194,50,74,0.35)',
                      }}
                    />

                    <div className="absolute inset-x-6 bottom-6 flex items-end justify-between">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--brand-gold)]">
                          {isRTL ? 'فرعنا في' : 'Our presence in'}
                        </p>
                        <h3 className="mt-1 font-display text-2xl font-bold text-white md:text-3xl">
                          {name}
                        </h3>
                        {firm && (
                          <p className="mt-1 max-w-xs text-xs text-white/75">{firm}</p>
                        )}
                      </div>
                      <div className="flex size-11 items-center justify-center rounded-full border border-[color:var(--brand-gold)]/60 bg-[rgba(7,7,11,0.5)] text-[color:var(--brand-gold)] transition-all duration-500 group-hover:bg-[rgba(194,50,74,0.4)] group-hover:text-white group-hover:rotate-45">
                        <ArrowUpRight className="size-5" />
                      </div>
                    </div>

                    {/* Top corner pin */}
                    <div className="absolute left-5 top-5 flex items-center gap-1.5 rounded-full border border-[color:var(--glass-border)] bg-[rgba(7,7,11,0.65)] px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-white/85 backdrop-blur">
                      <MapPin className="size-3 text-[color:var(--brand-gold)]" />
                      <span>{slug.toUpperCase()}</span>
                    </div>
                  </Link>
                </TiltCard>
              </ScrollReveal>
            );
          })}
        </div>

        {ordered.length === 0 && (
          <GlassCard className="p-10 text-center text-sm text-[color:var(--fg-muted)]">
            Countries are loading…
          </GlassCard>
        )}
      </div>
    </section>
  );
}

export default PresenceSection;
