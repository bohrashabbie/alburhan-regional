'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowUpRight, Search as SearchIcon } from 'lucide-react';

import { useProjectCategories } from '@/context/SiteContentContext';
import { getImageUrl } from '@/lib/api';
import { PageHero } from '@/components/sections/PageHero';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { GradientText } from '@/components/fx/GradientText';
import { GlassCard } from '@/components/fx/GlassCard';
import { cn } from '@/lib/utils';

export default function ProjectsPage() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const categories = useProjectCategories();
  const pick = (en?: string | null, ar?: string | null) =>
    (locale === 'ar' ? ar || en : en || ar) || '';

  const [activeCat, setActiveCat] = React.useState<number | 'all'>('all');
  const [query, setQuery] = React.useState('');

  const allTiles = useMemo(() => {
    const tiles: Array<{
      id: number;
      categoryId: number;
      name: string;
      description: string;
      categoryName: string;
      imageUrl: string | null;
    }> = [];

    for (const cat of categories) {
      const categoryName = pick(cat.name_en, cat.name_ar);
      for (const proj of cat.projects || []) {
        const firstImage = proj.images?.[0]?.image_url || cat.cover_image_url;
        tiles.push({
          id: proj.id,
          categoryId: cat.id,
          name: pick(proj.name_en, proj.name_ar),
          description: pick(proj.description_en, proj.description_ar),
          categoryName,
          imageUrl: getImageUrl(firstImage),
        });
      }
    }
    return tiles;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories, locale]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allTiles.filter((t) => {
      if (activeCat !== 'all' && t.categoryId !== activeCat) return false;
      if (!q) return true;
      return (
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.categoryName.toLowerCase().includes(q)
      );
    });
  }, [allTiles, activeCat, query]);

  return (
    <>
      <PageHero
        eyebrow={isRTL ? 'اختيار القصص' : 'Selected work'}
        title={t('header.ourProjects')}
        description={
          isRTL
            ? 'معرض مختار من أبرز تنفيذاتنا عبر الصالات التجارية، الأبراج السكنية، والمعارض الفاخرة.'
            : 'A curated portfolio across hospitality, retail, and residential landmarks.'
        }
      />

      <section className="relative pb-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Filter bar */}
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCat('all')}
                data-cursor-label="All"
                className={cn(
                  'rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.2em] transition-all duration-300',
                  activeCat === 'all'
                    ? 'border-[color:var(--brand-gold)] bg-[rgba(201,169,79,0.12)] text-[color:var(--brand-gold-bright)]'
                    : 'border-[color:var(--glass-border)] text-[color:var(--fg-muted)] hover:border-[color:var(--brand-gold)] hover:text-[color:var(--fg-default)]',
                )}
              >
                {isRTL ? 'الكل' : 'All'}
              </button>
              {categories.map((c) => {
                const active = activeCat === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setActiveCat(c.id)}
                    data-cursor-label={pick(c.name_en, c.name_ar)}
                    className={cn(
                      'rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.2em] transition-all duration-300',
                      active
                        ? 'border-[color:var(--brand-gold)] bg-[rgba(201,169,79,0.12)] text-[color:var(--brand-gold-bright)]'
                        : 'border-[color:var(--glass-border)] text-[color:var(--fg-muted)] hover:border-[color:var(--brand-gold)] hover:text-[color:var(--fg-default)]',
                    )}
                  >
                    {pick(c.name_en, c.name_ar)}
                  </button>
                );
              })}
            </div>

            <label className="flex items-center gap-2 rounded-full border border-[color:var(--glass-border)] bg-white/[0.02] px-3 py-1.5 text-sm focus-within:border-[color:var(--brand-gold)]">
              <SearchIcon className="size-4 text-[color:var(--brand-gold)]" />
              <input
                type="search"
                placeholder={isRTL ? 'ابحث...' : 'Search projects'}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-44 bg-transparent text-sm placeholder:text-[color:var(--fg-subtle)] focus:outline-none md:w-56"
              />
            </label>
          </div>

          {/* Grid */}
          {filtered.length ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((tile, i) => (
                <ScrollReveal key={tile.id} delay={(i % 6) * 0.06}>
                  <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 220, damping: 20 }}>
                    <Link
                      href={`/projects?cat=${tile.categoryId}#p-${tile.id}` as any}
                      className="group block"
                      data-cursor-label="View"
                    >
                      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-[color:var(--glass-border)]">
                        {tile.imageUrl ? (
                          <Image
                            src={tile.imageUrl}
                            alt={tile.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="size-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.08]"
                            unoptimized
                          />
                        ) : (
                          <div className="size-full bg-[color:var(--bg-elevated)]" />
                        )}
                        <div
                          aria-hidden
                          className="absolute inset-0"
                          style={{
                            background:
                              'linear-gradient(180deg, rgba(7,7,11,0.1) 0%, rgba(7,7,11,0.6) 55%, rgba(7,7,11,0.95) 100%)',
                          }}
                        />
                        <div
                          aria-hidden
                          className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                          style={{
                            boxShadow:
                              'inset 0 0 0 1px rgba(201,169,79,0.45), 0 0 36px rgba(194,50,74,0.3)',
                          }}
                        />
                        <div className="absolute inset-x-5 bottom-5 z-10 flex items-end justify-between gap-3">
                          <div className="min-w-0">
                            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--brand-gold)]">
                              {tile.categoryName}
                            </p>
                            <h3 className="mt-1.5 truncate font-display text-lg font-semibold text-white md:text-xl">
                              {tile.name}
                            </h3>
                          </div>
                          <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[color:var(--brand-gold)]/60 text-[color:var(--brand-gold)] transition-all group-hover:rotate-45 group-hover:bg-[rgba(194,50,74,0.35)] group-hover:text-white">
                            <ArrowUpRight className="size-4" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <GlassCard className="p-16 text-center">
              <h3 className="font-display text-2xl">
                <GradientText>
                  {isRTL ? 'لا توجد نتائج' : 'No projects found'}
                </GradientText>
              </h3>
              <p className="mt-3 text-sm text-[color:var(--fg-muted)]">
                {isRTL ? 'جرب عبارة بحث أخرى.' : 'Try a different search or category.'}
              </p>
            </GlassCard>
          )}
        </div>
      </section>
    </>
  );
}
