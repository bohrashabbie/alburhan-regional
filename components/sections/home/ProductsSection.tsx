'use client';

import * as React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';

import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { GradientText } from '@/components/fx/GradientText';
import { NeonButton } from '@/components/fx/NeonButton';
import { useProducts } from '@/context/SiteContentContext';
import { getImageUrl } from '@/lib/api';
import { cn } from '@/lib/utils';

const BENTO_LAYOUT = [
  'md:col-span-4 md:row-span-2',
  'md:col-span-2 md:row-span-1',
  'md:col-span-2 md:row-span-1',
  'md:col-span-3 md:row-span-1',
  'md:col-span-3 md:row-span-1',
  'md:col-span-6 md:row-span-1',
];

const FALLBACK =
  'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80';

export function ProductsSection() {
  const products = useProducts();
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const slots = products.slice(0, 6);

  if (!slots.length) return null;

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <ScrollReveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--brand-gold)]">
              {isRTL ? 'منتجاتنا' : 'Featured products'}
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl">
              <GradientText>
                {isRTL ? 'مجموعة الإضاءة المميزة' : 'A curated lighting line-up'}
              </GradientText>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <NeonButton asChild variant="ghost" size="md">
              <Link href="/products" data-cursor-label="Products">
                {isRTL ? 'كل المنتجات' : 'Browse catalog'}
                <ArrowUpRight className="size-4" />
              </Link>
            </NeonButton>
          </ScrollReveal>
        </div>

        <div className="grid auto-rows-[260px] gap-4 md:grid-cols-6">
          {slots.map((p, i) => {
            const title = isRTL ? p.name_ar || p.name_en : p.name_en;
            const desc = isRTL ? p.description_ar || p.description_en : p.description_en;
            const img = getImageUrl(p.image_url) || FALLBACK;
            const layout = BENTO_LAYOUT[i] || 'md:col-span-3';

            return (
              <ScrollReveal key={p.id} delay={i * 0.06} className={cn('h-full', layout)}>
                <Link
                  href="/products"
                  data-cursor-label="Open"
                  className="group relative block h-full overflow-hidden rounded-3xl border border-[color:var(--glass-border)]"
                >
                  <Image
                    src={img}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="size-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.08]"
                    unoptimized
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(7,7,11,0.1) 0%, rgba(7,7,11,0.55) 50%, rgba(7,7,11,0.95) 100%)',
                    }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      boxShadow:
                        'inset 0 0 0 1px rgba(201,169,79,0.45), 0 0 30px rgba(194,50,74,0.3)',
                    }}
                  />

                  <div className="absolute inset-x-5 bottom-5 z-10 flex items-end justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--brand-gold)]">
                        0{i + 1}
                      </p>
                      <h3 className="mt-1.5 truncate font-display text-lg font-semibold text-white md:text-xl">
                        {title}
                      </h3>
                      {desc && (
                        <p className="mt-1.5 line-clamp-2 text-xs text-white/70">
                          {desc}
                        </p>
                      )}
                    </div>
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[color:var(--brand-gold)]/60 text-[color:var(--brand-gold)] transition-all duration-300 group-hover:rotate-45 group-hover:bg-[rgba(194,50,74,0.35)] group-hover:text-white">
                      <ArrowUpRight className="size-4" />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ProductsSection;
