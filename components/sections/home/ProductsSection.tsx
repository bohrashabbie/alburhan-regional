'use client';

import * as React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';

import { useReveal } from '@/hooks/useReveal';
import { useProducts } from '@/context/SiteContentContext';
import { getImageUrl } from '@/lib/api';

const FALLBACK =
  'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80';

export function ProductsSection() {
  const products = useProducts();
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const slots = products.slice(0, 8);

  const { ref: headRef, visible: headVisible } = useReveal(0.3);

  if (!slots.length) return null;

  return (
    <section
      className="luxury-section relative bg-[#080808] py-24 md:py-32"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[#1A1A1A]" />

      {/* Header */}
      <div
        ref={headRef}
        className="mx-auto mb-12 flex w-full max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-end lg:px-8"
        style={{
          opacity: headVisible ? 1 : 0,
          transform: headVisible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#D4A843]">
            {isRTL ? 'منتجاتنا' : 'Featured products'}
          </p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] font-light leading-[1.1] tracking-[-0.02em] text-white">
            {isRTL ? 'مجموعة الإضاءة المميزة' : 'A curated lighting line-up'}
          </h2>
        </div>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 border-b border-[#2A2A2A] pb-1 text-[11px] uppercase tracking-[0.2em] text-[#555] transition-all duration-300 hover:border-[#D4A843] hover:text-white"
        >
          {isRTL ? 'كل المنتجات' : 'Browse catalog'}
          <ArrowUpRight className="size-3" />
        </Link>
      </div>

      {/* Horizontal scroll track */}
      <div
        className="relative w-full overflow-x-auto pb-4"
        style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
      >
        {/* Fade edges */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#080808] to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#080808] to-transparent"
        />

        <div
          className="flex gap-4 px-4 sm:px-6 lg:px-8"
          style={{ width: 'max-content' }}
        >
          {slots.map((p, i) => {
            const title = isRTL ? p.name_ar || p.name_en : p.name_en;
            const desc = isRTL ? p.description_ar || p.description_en : p.description_en;
            const img = getImageUrl(p.image_url) || FALLBACK;

            return (
              <Link
                key={p.id}
                href={`/products/${p.id}` as any}
                className="group relative flex h-[380px] w-[260px] shrink-0 flex-col justify-end overflow-hidden bg-[#0C0C0C]"
                style={{ scrollSnapAlign: 'start' }}
              >
                {/* Product image */}
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <Image
                    src={img}
                    alt={title}
                    fill
                    sizes="260px"
                    className="object-contain p-6 transition-transform duration-700 group-hover:scale-[1.06]"
                    loading="lazy"
                  />
                </div>

                {/* Dark bg overlay */}
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(8,8,8,0.98) 0%, rgba(8,8,8,0.5) 50%, rgba(8,8,8,0.1) 100%)',
                  }}
                />

                {/* Gold border on hover */}
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ boxShadow: 'inset 0 0 0 0.5px #D4A843' }}
                />

                {/* Number */}
                <span className="absolute left-4 top-4 z-10 font-mono text-[10px] text-[#333]">
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Content */}
                <div className="relative z-10 p-5">
                  <h3 className="line-clamp-2 text-[14px] font-light leading-snug text-white transition-colors duration-300 group-hover:text-[#D4A843]">
                    {title}
                  </h3>
                  {desc && (
                    <p className="mt-1 line-clamp-2 text-[11px] font-light text-[#444]">
                      {desc}
                    </p>
                  )}

                  {/* Hover CTA */}
                  <div className="mt-3 flex items-center gap-1 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <span className="text-[11px] uppercase tracking-[0.15em] text-[#D4A843]">
                      {isRTL ? 'عرض التفاصيل' : 'View details'}
                    </span>
                    <ArrowUpRight className="size-3 text-[#D4A843]" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Scroll hint */}
      <p className="mt-4 text-center font-mono text-[9px] uppercase tracking-[0.25em] text-[#2A2A2A]">
        {isRTL ? 'مرر لرؤية المزيد' : 'Scroll to explore'}
      </p>
    </section>
  );
}

export default ProductsSection;
