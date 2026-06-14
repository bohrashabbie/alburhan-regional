'use client';

import * as React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';

import { useReveal } from '@/hooks/useReveal';
import { useSiteContent } from '@/context/SiteContentContext';

export function IntroSection() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const { setting: _setting, content } = useSiteContent();

  const { ref: leftRef, visible: leftVisible } = useReveal(0.2);
  const { ref: rightRef, visible: rightVisible } = useReveal(0.15);

  const intro = content?.page_contents?.find(
    (p) => p.page_key === 'home' && p.section_key === 'introduction',
  );
  const introTitle =
    (isRTL ? intro?.title_ar : intro?.title_en) || t('sections.aboutUsTitle');
  const introBody =
    (isRTL ? intro?.content_ar : intro?.content_en) ||
    (isRTL
      ? 'مجموعة البرهان تقدم حلول إضاءة مبتكرة تمزج الجمال بالأداء — عبر أربع دول ومئات المشاريع.'
      : 'AL-Burhan Group delivers lighting solutions that fuse design with engineering — across four countries and hundreds of landmark projects.');

  const pillars = isRTL
    ? [
        { title: 'أداء', text: 'إضاءة دقيقة وموثوقة طوال دورة الحياة.' },
        { title: 'استدامة', text: 'حلول موفرة للطاقة تخفض الأحمال الكهربائية.' },
        { title: 'شراكة', text: 'فريق واحد من التصور إلى التشغيل.' },
        { title: 'ابتكار', text: 'تقنيات LED ذكية وأنظمة إضاءة متطورة.' },
      ]
    : [
        { title: 'Performance', text: 'Precision lighting engineered for lifetime reliability.' },
        { title: 'Sustainability', text: 'Smart, energy-efficient fixtures that cut grid load.' },
        { title: 'Partnership', text: 'One team — from concept to commissioning.' },
        { title: 'Innovation', text: 'Smart LED systems redefining modern spaces.' },
      ];

  return (
    <section
      className="luxury-section relative bg-[#080808] py-24 md:py-32"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Subtle border top */}
      <div className="absolute inset-x-0 top-0 h-px bg-[#1A1A1A]" />

      <div className="mx-auto grid w-full max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:gap-24 lg:px-8">

        {/* Left — eyebrow + heading */}
        <div
          ref={leftRef}
          className="reveal-left flex flex-col justify-center"
          data-visible={leftVisible || undefined}
          style={{
            opacity: leftVisible ? 1 : 0,
            transform: leftVisible ? 'translateX(0)' : (isRTL ? 'translateX(40px)' : 'translateX(-40px)'),
            transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#D4A843]">
            {t('sections.introduction')}
          </p>

          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3rem)] font-light leading-[1.1] tracking-[-0.02em] text-white">
            {introTitle}
          </h2>

          <p className="mt-6 text-[15px] font-light leading-relaxed text-[#555]">
            {introBody}
          </p>

          <Link
            href="/about"
            className="mt-10 inline-flex w-fit items-center gap-2 border-b border-[#2A2A2A] pb-1 text-[12px] uppercase tracking-[0.18em] text-[#555] transition-all duration-300 hover:border-[#D4A843] hover:text-white"
          >
            {isRTL ? 'تعرف علينا' : 'Learn more'}
            <ArrowRight className="size-3" />
          </Link>
        </div>

        {/* Right — pillars list */}
        <div
          ref={rightRef}
          className="flex flex-col justify-center gap-0"
        >
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className="group flex items-start gap-5 border-b border-[#111] py-6 last:border-0"
              style={{
                opacity: rightVisible ? 1 : 0,
                transform: rightVisible ? 'translateX(0)' : 'translateX(24px)',
                transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 100}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 100}ms`,
              }}
            >
              {/* Gold dot */}
              <span
                className="mt-[7px] size-1.5 shrink-0 rounded-full bg-[#D4A843] transition-all duration-300 group-hover:scale-150 group-hover:shadow-[0_0_8px_rgba(212,168,67,0.6)]"
                aria-hidden
              />
              <div>
                <h3 className="text-[15px] font-light text-white transition-colors duration-300 group-hover:text-[#D4A843]">
                  {p.title}
                </h3>
                <p className="mt-1 text-[13px] font-light leading-relaxed text-[#444]">
                  {p.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default IntroSection;
