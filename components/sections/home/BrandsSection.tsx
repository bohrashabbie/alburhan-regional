'use client';

import * as React from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

import { useReveal } from '@/hooks/useReveal';
import { MarqueeRow } from '@/components/motion/MarqueeRow';
import { useBrands } from '@/context/SiteContentContext';
import { getImageUrl } from '@/lib/api';

interface BrandTileProps {
  name: string;
  img: string;
  href?: string | null;
}

function BrandTile({ name, img, href }: BrandTileProps) {
  const Wrapper: React.ElementType = href ? 'a' : 'div';
  const extra = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <Wrapper
      {...extra}
      aria-label={name}
      title={name}
      className="brand-tile group flex shrink-0 flex-col items-center gap-2 px-2"
    >
      <div className="brand-card relative flex h-16 w-36 items-center justify-center rounded-lg border border-[#1A1A1A] bg-white/[0.04] p-3 transition-all duration-300 group-hover:border-[#D4A843]/40 group-hover:bg-white/[0.08]">
        <Image
          src={img}
          alt={name}
          width={120}
          height={48}
          loading="lazy"
          className="brand-logo max-h-full max-w-full object-contain"
        />
      </div>
      <span className="max-w-[140px] truncate text-center font-mono text-[8px] uppercase tracking-[0.22em] text-[#444] transition-colors duration-300 group-hover:text-[#D4A843]">
        {name}
      </span>
    </Wrapper>
  );
}

export function BrandsSection() {
  const brands = useBrands();
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const t = useTranslations();

  const { ref: headRef, visible: headVisible } = useReveal(0.3);

  if (!brands || brands.length === 0) return null;

  const valid = brands
    .filter((b) => b.is_active !== false)
    .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
    .map((b) => ({ ...b, img: getImageUrl(b.logo_url) }))
    .filter((b): b is typeof b & { img: string } => Boolean(b.img));

  if (!valid.length) return null;

  return (
    <section
      className="luxury-section relative overflow-hidden bg-[#080808] py-24 md:py-32"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* CSS for brand logo hover — no JS needed */}
      <style>{`
        .brand-logo {
          opacity: 0.9;
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .brand-tile:hover .brand-logo {
          opacity: 1;
          transform: scale(1.04);
        }
      `}</style>

      <div className="absolute inset-x-0 top-0 h-px bg-[#1A1A1A]" />

      {/* Header */}
      <div
        ref={headRef}
        className="mx-auto mb-12 w-full max-w-7xl px-4 text-center sm:px-6 lg:px-8"
        style={{
          opacity: headVisible ? 1 : 0,
          transform: headVisible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#D4A843]">
          {t('sections.europeanBrands')}
        </p>
        <h2 className="mt-4 text-[clamp(1.8rem,3.5vw,2.8rem)] font-light leading-[1.1] tracking-[-0.02em] text-white">
          {t('sections.ourBrand')}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[13px] font-light text-[#444]">
          {isRTL
            ? 'شراكات مع أفضل علامات الإضاءة الأوروبية.'
            : "Partnered with Europe's most respected lighting ateliers."}
        </p>
      </div>

      {/* Marquee */}
      <MarqueeRow speed={55} fade>
        {valid.map((b) => (
          <BrandTile key={b.id} name={b.name} img={b.img} href={b.website_url} />
        ))}
      </MarqueeRow>

      {/* Bottom attestations */}
      <div className="mx-auto mt-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 border-t border-[#111] pt-7">
          {[
            isRTL ? 'مصادر أصلية' : 'Authentic sourcing',
            isRTL ? 'ضمان المصنّع' : 'Manufacturer warranty',
            isRTL ? 'دعم ما بعد البيع' : 'After-sales support',
          ].map((item) => (
            <span
              key={item}
              className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.25em] text-[#333]"
            >
              <span className="size-1 shrink-0 rounded-full bg-[#D4A843]" aria-hidden />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BrandsSection;
