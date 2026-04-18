'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { Sparkles } from 'lucide-react';

import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { MarqueeRow } from '@/components/motion/MarqueeRow';
import { GradientText } from '@/components/fx/GradientText';
import { useBrands } from '@/context/SiteContentContext';
import { getImageUrl } from '@/lib/api';
import { cn } from '@/lib/utils';

interface BrandTileProps {
  name: string;
  img: string;
  href?: string | null;
  size?: 'sm' | 'md' | 'lg';
}

function BrandTile({ name, img, href, size = 'md' }: BrandTileProps) {
  const dims =
    size === 'sm'
      ? 'h-20 w-40 md:h-24 md:w-48'
      : size === 'lg'
      ? 'h-28 w-56 md:h-32 md:w-64'
      : 'h-24 w-48 md:h-28 md:w-56';

  const Wrapper: React.ElementType = href ? 'a' : 'div';
  const extra = href
    ? { href, target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Wrapper
      {...extra}
      className={cn(
        'group relative block shrink-0 transition-transform duration-500',
        'hover:-translate-y-1 hover:scale-105',
        dims,
      )}
      data-cursor-label={name}
      aria-label={name}
    >
      <Image
        src={img}
        alt={name}
        fill
        sizes="(max-width: 768px) 180px, 240px"
        unoptimized
        className="object-contain"
      />
    </Wrapper>
  );
}

export function BrandsSection() {
  const brands = useBrands();
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const t = useTranslations();

  if (!brands || brands.length === 0) return null;

  const valid = brands
    .filter((b) => b.is_active !== false)
    .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
    .map((b) => ({ ...b, img: getImageUrl(b.logo_url) }))
    .filter((b): b is typeof b & { img: string } => Boolean(b.img));

  if (!valid.length) return null;

  // Split into two staggered rows for visual rhythm
  const row1 = valid.filter((_, i) => i % 2 === 0);
  const row2 = valid.filter((_, i) => i % 2 === 1);

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* layered background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse at 20% 0%, rgba(194,50,74,0.18), transparent 55%), radial-gradient(ellipse at 80% 100%, rgba(201,169,79,0.12), transparent 50%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-grid-soft opacity-40"
        style={{
          maskImage:
            'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        }}
      />

      {/* header */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-[color:var(--glass-border)] bg-white/[0.03] px-3 py-1 backdrop-blur"
          >
            <Sparkles className="size-3.5 text-[color:var(--brand-gold)]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--brand-gold)]">
              {t('sections.europeanBrands')}
            </span>
            <span className="ml-2 rounded-full bg-[color:var(--brand-gold)]/10 px-2 py-0.5 text-[10px] font-semibold text-[color:var(--brand-gold-bright)]">
              {valid.length}+
            </span>
          </motion.div>

          <h2 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            <GradientText>{t('sections.ourBrand')}</GradientText>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm text-[color:var(--fg-muted)] md:text-base">
            {isRTL
              ? 'نفخر بشراكتنا مع أفضل العلامات التجارية العالمية لنقدم لكم حلول إضاءة استثنائية.'
              : 'Proudly partnered with Europe’s most respected lighting ateliers and manufacturers.'}
          </p>
        </ScrollReveal>
      </div>

      {/* marquee rows */}
      <div className="relative flex flex-col gap-6">
        {/* ambient glow strip behind marquees */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/2 -z-0 h-px -translate-y-1/2 opacity-60"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(201,169,79,0.35), transparent)',
          }}
        />

        <MarqueeRow speed={60}>
          {row1.map((b, i) => (
            <BrandTile
              key={b.id}
              name={b.name}
              img={b.img}
              href={b.website_url}
              size={i % 3 === 0 ? 'lg' : 'md'}
            />
          ))}
        </MarqueeRow>

        {row2.length > 0 && (
          <MarqueeRow speed={75} reverse>
            {row2.map((b, i) => (
              <BrandTile
                key={b.id}
                name={b.name}
                img={b.img}
                href={b.website_url}
                size={i % 2 === 0 ? 'md' : 'sm'}
              />
            ))}
          </MarqueeRow>
        )}
      </div>

      {/* bottom caption */}
      <div className="mx-auto mt-14 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs uppercase tracking-[0.25em] text-[color:var(--fg-subtle)]">
          <span className="inline-flex items-center gap-2">
            <span className="size-1 rounded-full bg-[color:var(--brand-gold)]" />
            {isRTL ? 'علامات أصلية' : 'Authentic sourcing'}
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="size-1 rounded-full bg-[color:var(--brand-gold)]" />
            {isRTL ? 'ضمان الصانع' : 'Manufacturer warranty'}
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="size-1 rounded-full bg-[color:var(--brand-gold)]" />
            {isRTL ? 'دعم ما بعد البيع' : 'After-sales support'}
          </span>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default BrandsSection;
