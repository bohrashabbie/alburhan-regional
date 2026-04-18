'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Search as SearchIcon, ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/routing';

import { useProducts } from '@/context/SiteContentContext';
import { getImageUrl } from '@/lib/api';
import { PageHero } from '@/components/sections/PageHero';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { GlassCard } from '@/components/fx/GlassCard';
import { TiltCard } from '@/components/fx/TiltCard';
import { GradientText } from '@/components/fx/GradientText';

const FALLBACK =
  'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80';

export default function ProductsPage() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const products = useProducts();
  const [query, setQuery] = React.useState('');

  const pick = (en?: string | null, ar?: string | null) =>
    (isRTL ? ar || en : en || ar) || '';

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => {
      const name = pick(p.name_en, p.name_ar).toLowerCase();
      const desc = pick(p.description_en, p.description_ar).toLowerCase();
      return name.includes(q) || desc.includes(q);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, query, isRTL]);

  return (
    <>
      <PageHero
        eyebrow={isRTL ? 'مجموعتنا' : 'Collection'}
        title={t('header.ourProducts')}
        description={
          isRTL
            ? 'كتالوج منتخب من أرقى الفخامة حتى تقنيات الإضاءة الذكية.'
            : 'A curated catalog spanning statement fixtures to smart-control systems.'
        }
      >
        <label className="inline-flex w-full max-w-md items-center gap-2 rounded-full border border-[color:var(--glass-border)] bg-white/[0.02] px-3 py-2 text-sm focus-within:border-[color:var(--brand-gold)]">
          <SearchIcon className="size-4 text-[color:var(--brand-gold)]" />
          <input
            type="search"
            placeholder={isRTL ? 'ابحث في المنتجات' : 'Search products'}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm placeholder:text-[color:var(--fg-subtle)] focus:outline-none"
          />
        </label>
      </PageHero>

      <section className="relative pb-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {filtered.length ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p, i) => {
                const title = pick(p.name_en, p.name_ar);
                const desc = pick(p.description_en, p.description_ar);
                const img = getImageUrl(p.image_url) || FALLBACK;
                return (
                  <ScrollReveal key={p.id} delay={(i % 8) * 0.05}>
                    <TiltCard max={6} className="h-full">
                      <Link
                        href="#"
                        data-cursor-label="View"
                        className="group block h-full overflow-hidden rounded-2xl border border-[color:var(--glass-border)] bg-white/[0.02]"
                      >
                        <div className="relative aspect-[4/5] overflow-hidden">
                          <Image
                            src={img}
                            alt={title}
                            fill
                            sizes="(max-width: 768px) 50vw, 25vw"
                            className="size-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.08]"
                            unoptimized
                          />
                          <div
                            aria-hidden
                            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                            style={{
                              background:
                                'linear-gradient(180deg, transparent 45%, rgba(7,7,11,0.9) 100%)',
                            }}
                          />
                          <div className="absolute inset-x-4 bottom-4 flex items-center justify-between opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--brand-gold)]">
                              View
                            </span>
                            <ArrowUpRight className="size-4 text-[color:var(--brand-gold)]" />
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="truncate font-display text-base font-semibold text-[color:var(--fg-default)]">
                            {title}
                          </h3>
                          {desc && (
                            <p className="mt-1 line-clamp-2 text-xs text-[color:var(--fg-muted)]">
                              {desc}
                            </p>
                          )}
                        </div>
                      </Link>
                    </TiltCard>
                  </ScrollReveal>
                );
              })}
            </div>
          ) : (
            <GlassCard className="p-16 text-center">
              <h3 className="font-display text-2xl">
                <GradientText>
                  {isRTL ? 'لا توجد نتائج' : 'No matching products'}
                </GradientText>
              </h3>
            </GlassCard>
          )}
        </div>
      </section>
    </>
  );
}
