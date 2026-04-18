'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowUpRight, Quote, Sparkles } from 'lucide-react';

import {
  useProjectCategories,
  useCountries,
} from '@/context/SiteContentContext';
import { getImageUrl } from '@/lib/api';
import { Link } from '@/i18n/routing';

import { PageHero } from '@/components/sections/PageHero';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { GlassCard } from '@/components/fx/GlassCard';
import { GradientText } from '@/components/fx/GradientText';
import { TiltCard } from '@/components/fx/TiltCard';
import { CountUp } from '@/components/motion/CountUp';
import { cn } from '@/lib/utils';

export default function CaseStudiesPage() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'ar';
  void t;

  const categories = useProjectCategories();
  const countries = useCountries();

  const studies = React.useMemo(() => {
    const flat: {
      name: string;
      category: string;
      country?: string;
      hero: string;
      images: string[];
    }[] = [];

    for (const cat of categories) {
      if (cat.is_active === false) continue;
      const catName =
        (isRTL ? cat.name_ar || cat.name_en : cat.name_en) || '';
      for (const p of cat.projects || []) {
        if (p.is_active === false) continue;
        const imgs = [...(p.images || [])]
          .filter((i) => i.is_active !== false)
          .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
          .map((i) => getImageUrl(i.image_url))
          .filter((u): u is string => !!u);
        if (imgs.length === 0) continue;
        const name =
          (isRTL ? p.name_ar || p.name_en : p.name_en) || 'Case study';
        const country = countries.find((c) => c.id === p.country_id);
        const countryName = country
          ? (isRTL ? country.name_ar || country.name_en : country.name_en) ||
            undefined
          : undefined;
        flat.push({
          name,
          category: catName,
          country: countryName,
          hero: imgs[0],
          images: imgs,
        });
      }
    }

    return flat;
  }, [categories, countries, isRTL]);

  const stats = [
    {
      label: isRTL ? 'مشاريع منفذة' : 'Projects delivered',
      value: Math.max(studies.length, 0),
      suffix: '+',
    },
    {
      label: isRTL ? 'دول' : 'Countries',
      value: countries.length,
      suffix: '',
    },
    {
      label: isRTL ? 'سنوات خبرة' : 'Years of expertise',
      value: 20,
      suffix: '+',
    },
    {
      label: isRTL ? 'علامات تجارية' : 'Premium brands',
      value: 40,
      suffix: '+',
    },
  ];

  // Pick a featured study for the intro spotlight
  const featured = studies[0];

  return (
    <>
      <PageHero
        eyebrow={isRTL ? 'مجموعة أعمال' : 'Case studies'}
        title={isRTL ? 'قصص نور' : 'Stories of light'}
        description={
          isRTL
            ? 'نستعرض مجموعة مختارة من المشاريع التي أضاءت المساحات وأعادت تعريف التجارب حول العالم.'
            : 'A curated set of projects where Al-Burhan transformed spaces and redefined how people experience light.'
        }
      />

      {/* Featured spotlight */}
      {featured && (
        <section className="relative pb-16 md:pb-24">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="grid gap-8 overflow-hidden rounded-3xl border border-[color:var(--glass-border)] bg-[color:var(--bg-elevated)] p-6 md:grid-cols-5 md:p-10">
                <div className="md:col-span-3">
                  <div className="relative h-[280px] overflow-hidden rounded-2xl md:h-[380px]">
                    <Image
                      src={featured.hero}
                      alt={featured.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 60vw"
                      unoptimized
                      className="object-cover"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(180deg, transparent 45%, rgba(10,6,14,0.85) 100%)',
                      }}
                    />
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-[color:var(--brand-gold)]/50 bg-black/40 px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[color:var(--brand-gold)] backdrop-blur">
                      <Sparkles className="size-3" />
                      {isRTL ? 'قصة مميزة' : 'Featured'}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center md:col-span-2">
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--brand-gold)]">
                    {featured.category}
                    {featured.country ? ` · ${featured.country}` : ''}
                  </p>
                  <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
                    <GradientText>{featured.name}</GradientText>
                  </h2>
                  <Quote className="mt-6 size-8 text-[color:var(--brand-gold)]/70" />
                  <p className="mt-3 text-[color:var(--fg-muted)]">
                    {isRTL
                      ? 'من التصور إلى التنفيذ، نحوّل الرؤية إلى تجربة إضاءة متكاملة تعكس هوية كل مشروع.'
                      : 'From concept to execution we translate a brief into a complete lighting experience that reflects the identity of every project.'}
                  </p>
                  <div className="mt-8 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-[color:var(--brand-gold)]">
                    <Link
                      href="/projects"
                      className="inline-flex items-center gap-1.5 transition-colors hover:text-[color:var(--brand-gold-bright)]"
                    >
                      {isRTL ? 'استعراض كل المشاريع' : 'View all projects'}
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Stats */}
      <section className="relative pb-16 md:pb-24">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 0.05}>
                <GlassCard className="p-6 text-center">
                  <div className="font-display text-4xl font-bold text-[color:var(--brand-gold-bright)] md:text-5xl">
                    <CountUp to={s.value} />
                    {s.suffix}
                  </div>
                  <p className="mt-2 text-xs uppercase tracking-[0.25em] text-[color:var(--fg-muted)]">
                    {s.label}
                  </p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Grid of case studies */}
      <section className="relative pb-28">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--brand-gold)]">
                  {isRTL ? 'كل القصص' : 'All case studies'}
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
                  {isRTL ? 'مشاريع ملهمة' : 'Selected work'}
                </h2>
              </div>
            </div>
          </ScrollReveal>

          {studies.length === 0 ? (
            <p className="py-10 text-center text-[color:var(--fg-muted)]">
              {isRTL
                ? 'ستظهر قريباً دراسات حالة جديدة.'
                : 'Fresh case studies are on the way. Check back soon.'}
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {studies.map((s, i) => (
                <ScrollReveal key={s.name + i} delay={(i % 6) * 0.05}>
                  <TiltCard className="h-full">
                    <Link
                      href="/projects"
                      className={cn(
                        'group relative block h-[360px] overflow-hidden rounded-2xl border border-[color:var(--glass-border)] bg-[color:var(--bg-elevated)]',
                        'transition-all duration-500 hover:border-[color:var(--brand-gold)] hover:-translate-y-1',
                      )}
                    >
                      <Image
                        src={s.hero}
                        alt={s.name}
                        fill
                        sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
                        unoptimized
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--brand-gold)]">
                          {s.category}
                          {s.country ? ` · ${s.country}` : ''}
                        </p>
                        <h3 className="mt-2 font-display text-xl font-semibold text-white">
                          {s.name}
                        </h3>
                        <div className="mt-3 flex items-center gap-1.5 text-xs text-white/70 transition-colors group-hover:text-[color:var(--brand-gold)]">
                          <span>
                            {isRTL ? 'عرض القصة' : 'Read case study'}
                          </span>
                          <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </div>
                      </div>
                      <motion.div
                        aria-hidden
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="pointer-events-none absolute inset-x-0 top-0 h-px"
                        style={{
                          background:
                            'linear-gradient(90deg, transparent, rgba(201,169,79,0.9), transparent)',
                        }}
                      />
                    </Link>
                  </TiltCard>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
