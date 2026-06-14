'use client';

import * as React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

import { useReveal } from '@/hooks/useReveal';

export function CTASection() {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const t = useTranslations();

  const { ref, visible } = useReveal(0.2);

  return (
    <section
      className="luxury-section relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-[#080808] py-24 md:py-32"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[#1A1A1A]" />

      {/* Radial gold glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(212,168,67,0.07), transparent 70%)',
        }}
      />

      {/* Content */}
      <div
        ref={ref}
        className="relative z-10 mx-auto w-full max-w-3xl px-4 text-center sm:px-6 lg:px-8"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(32px)',
          transition: 'opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#D4A843]">
          {isRTL ? 'هيا نبدأ' : "Let's build"}
        </p>

        <h2 className="mt-6 font-display text-[clamp(2.2rem,5vw,4rem)] font-light leading-[1.05] tracking-[-0.03em] text-white">
          {isRTL ? (
            <>نصمم ونضيء <span className="text-[#D4A843]">رؤيتك</span> القادمة.</>
          ) : (
            <>Design, build &amp; <span className="text-[#D4A843]">illuminate</span> your next landmark.</>
          )}
        </h2>

        <p className="mx-auto mt-6 max-w-md text-[14px] font-light leading-relaxed text-[#444]">
          {isRTL
            ? 'فريقنا يرافقك من الفكرة إلى التسليم. شراكة واحدة — نتيجة استثنائية.'
            : 'From concept to commissioning — one partnership, one extraordinary result.'}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#D4A843] px-8 py-4 text-[12px] uppercase tracking-[0.18em] text-black transition-all duration-300 hover:bg-[#C49730]"
          >
            {t('header.contact')}
            <ArrowRight className="size-3.5" />
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 border border-[#1A1A1A] px-8 py-4 text-[12px] uppercase tracking-[0.18em] text-[#555] transition-all duration-300 hover:border-[#D4A843] hover:text-white"
          >
            {isRTL ? 'معرض المشاريع' : 'Explore portfolio'}
          </Link>
        </div>

        {/* Trust micro row */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {[
            isRTL ? '٢٠+ سنة خبرة' : '20+ years experience',
            isRTL ? 'تسليم عالمي' : 'Global delivery',
            isRTL ? 'دعم ٢٤/٧' : '24/7 support',
          ].map((item) => (
            <span
              key={item}
              className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.25em] text-[#333]"
            >
              <span className="size-1 shrink-0 rounded-full bg-[#D4A843]/50" aria-hidden />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CTASection;
