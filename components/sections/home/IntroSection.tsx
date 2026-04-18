'use client';

import * as React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowUpRight, Leaf, Gauge, Handshake } from 'lucide-react';

import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { GradientText } from '@/components/fx/GradientText';
import { GlassCard } from '@/components/fx/GlassCard';
import { NeonButton } from '@/components/fx/NeonButton';
import { ParallaxImage } from '@/components/motion/ParallaxImage';
import { useSiteContent } from '@/context/SiteContentContext';
import { getImageUrl } from '@/lib/api';

const FALLBACK =
  'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1600&q=80';

export function IntroSection() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const { setting, content } = useSiteContent();

  const heroImage =
    getImageUrl(setting('home_intro_image_url')) ||
    getImageUrl(setting('about_feature_image_url')) ||
    FALLBACK;

  const intro = content?.page_contents?.find((p) => p.page_key === 'home' && p.section_key === 'introduction');
  const introTitle =
    (isRTL ? intro?.title_ar : intro?.title_en) || t('sections.aboutUsTitle');
  const introBody =
    (isRTL ? intro?.content_ar : intro?.content_en) ||
    (isRTL
      ? 'مجموعة البرهان تقدم حلول إضاءة مبتكرة تمزج الجمال بالأداء — عبر أربع دول ومئات المشاريع.'
      : 'AL-Burhan Group delivers lighting solutions that fuse design with engineering — across four countries and hundreds of landmark projects.');

  const pillars = isRTL
    ? [
        { icon: <Gauge className="size-5" />, title: 'أداء', text: 'إضاءة دقيقة وموثوقة.' },
        { icon: <Leaf className="size-5" />, title: 'استدامة', text: 'حلول موفرة للطاقة.' },
        { icon: <Handshake className="size-5" />, title: 'شراكة', text: 'تصميم وتنفيذ بيد واحدة.' },
      ]
    : [
        {
          icon: <Gauge className="size-5" />,
          title: 'Performance',
          text: 'Precision lighting engineered for lifetime reliability.',
        },
        {
          icon: <Leaf className="size-5" />,
          title: 'Sustainability',
          text: 'Smart, energy-efficient fixtures that cut grid load.',
        },
        {
          icon: <Handshake className="size-5" />,
          title: 'Partnership',
          text: 'One team — from concept to commissioning.',
        },
      ];

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        {/* Image column */}
        <ScrollReveal direction="left" className="lg:col-span-5">
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-4 rounded-3xl blur-2xl opacity-60"
              style={{
                background:
                  'radial-gradient(closest-side, rgba(194,50,74,0.4), transparent 70%)',
              }}
            />
            <GlassCard intensity="strong" className="relative overflow-hidden p-2">
              <ParallaxImage
                src={heroImage}
                alt="Al-Burhan"
                width={720}
                height={900}
                shift={40}
                containerClassName="relative aspect-[4/5] w-full overflow-hidden rounded-2xl"
                className="size-full"
                unoptimized
              />
              {/* Floating chip */}
              <div className="absolute bottom-6 left-6 right-6 z-10 flex items-center justify-between rounded-2xl border border-[color:var(--glass-border)] bg-[rgba(7,7,11,0.75)] px-4 py-3 backdrop-blur">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--brand-gold)]">
                    Since 2005
                  </p>
                  <p className="mt-0.5 text-sm font-semibold">
                    {isRTL ? '20+ عاماً من الابتكار' : '20+ years of innovation'}
                  </p>
                </div>
                <div className="flex size-10 items-center justify-center rounded-full border border-[color:var(--brand-gold)]/50 bg-[rgba(201,169,79,0.08)]">
                  <Leaf className="size-4 text-[color:var(--brand-gold)]" />
                </div>
              </div>
            </GlassCard>
          </div>
        </ScrollReveal>

        {/* Text column */}
        <div className="lg:col-span-7">
          <ScrollReveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--brand-gold)]">
              {t('sections.introduction')}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl">
              <GradientText>{introTitle}</GradientText>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[color:var(--fg-muted)] md:text-lg">
              {introBody}
            </p>
          </ScrollReveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {pillars.map((p, i) => (
              <ScrollReveal key={p.title} delay={0.12 + i * 0.08}>
                <GlassCard className="group h-full p-5 transition-colors duration-500 hover:border-[color:var(--brand-gold)]">
                  <div className="mb-3 flex size-10 items-center justify-center rounded-xl border border-[color:var(--glass-border)] text-[color:var(--brand-gold)] transition-all duration-300 group-hover:scale-110 group-hover:bg-[rgba(201,169,79,0.1)]">
                    {p.icon}
                  </div>
                  <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                  <p className="mt-1 text-sm text-[color:var(--fg-muted)]">{p.text}</p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.4}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <NeonButton asChild size="md">
                <Link href="/about" data-cursor-label="About">
                  {isRTL ? 'تعرف علينا' : 'Learn about us'}
                  <ArrowUpRight className="size-4" />
                </Link>
              </NeonButton>
              <NeonButton asChild size="md" variant="ghost">
                <Link href="/services" data-cursor-label="Services">
                  {isRTL ? 'خدماتنا' : 'Our services'}
                </Link>
              </NeonButton>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default IntroSection;
