'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import {
  Briefcase,
  Users,
  Globe2,
  Sparkles,
  HeartHandshake,
  MapPin,
  Clock,
  Send,
  Upload,
  ArrowUpRight,
} from 'lucide-react';

import { useCountries } from '@/context/SiteContentContext';
import { PageHero } from '@/components/sections/PageHero';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { GlassCard } from '@/components/fx/GlassCard';
import { GradientText } from '@/components/fx/GradientText';
import { NeonButton } from '@/components/fx/NeonButton';
import { SpotlightCard } from '@/components/fx/SpotlightCard';
import { cn } from '@/lib/utils';

const DEPARTMENTS = [
  {
    id: 'design',
    en: 'Lighting Design',
    ar: 'تصميم الإضاءة',
    icon: Sparkles,
  },
  {
    id: 'engineering',
    en: 'Engineering',
    ar: 'الهندسة',
    icon: Briefcase,
  },
  {
    id: 'project-mgmt',
    en: 'Project Management',
    ar: 'إدارة المشاريع',
    icon: Users,
  },
  {
    id: 'sales',
    en: 'Sales & Business Development',
    ar: 'المبيعات وتطوير الأعمال',
    icon: HeartHandshake,
  },
  {
    id: 'operations',
    en: 'Operations',
    ar: 'العمليات',
    icon: Globe2,
  },
] as const;

const OPENINGS = [
  {
    role: { en: 'Senior Lighting Designer', ar: 'مصمم إضاءة أول' },
    dept: 'design',
    city: { en: 'Kuwait City', ar: 'مدينة الكويت' },
    type: { en: 'Full-time · On-site', ar: 'دوام كامل · في الموقع' },
  },
  {
    role: { en: 'Electrical Engineer', ar: 'مهندس كهرباء' },
    dept: 'engineering',
    city: { en: 'Dubai', ar: 'دبي' },
    type: { en: 'Full-time', ar: 'دوام كامل' },
  },
  {
    role: { en: 'Project Manager', ar: 'مدير مشروع' },
    dept: 'project-mgmt',
    city: { en: 'Jiangmen, China', ar: 'جيانغمن، الصين' },
    type: { en: 'Full-time', ar: 'دوام كامل' },
  },
  {
    role: { en: 'Business Development Lead', ar: 'رئيس تطوير الأعمال' },
    dept: 'sales',
    city: { en: 'Cairo', ar: 'القاهرة' },
    type: { en: 'Full-time · Hybrid', ar: 'دوام كامل · هجين' },
  },
  {
    role: { en: 'Logistics Coordinator', ar: 'منسق لوجستي' },
    dept: 'operations',
    city: { en: 'Kuwait City', ar: 'مدينة الكويت' },
    type: { en: 'Full-time', ar: 'دوام كامل' },
  },
];

const VALUES = [
  {
    en: 'Craft over quantity',
    ar: 'الإتقان قبل الكم',
    desc: {
      en: 'We build teams that ship fewer but sharper projects.',
      ar: 'نبني فرقاً تنجز مشاريع أقل ولكن أدقّ.',
    },
  },
  {
    en: 'Own your surface',
    ar: 'تحكّم في أثرك',
    desc: {
      en: 'Autonomy, accountability, and a calm operating rhythm.',
      ar: 'استقلالية ومسؤولية وإيقاع هادئ في العمل.',
    },
  },
  {
    en: 'Global DNA',
    ar: 'هوية عالمية',
    desc: {
      en: 'Four countries, one design standard. Travel between offices is part of the job.',
      ar: 'أربع دول ومعيار تصميم واحد. التنقّل بين المكاتب جزء من الوظيفة.',
    },
  },
  {
    en: 'Learn by doing',
    ar: 'التعلّم بالممارسة',
    desc: {
      en: 'Budget for workshops, tradeshows, and certifications.',
      ar: 'ميزانية مخصّصة لورش العمل والمعارض والشهادات.',
    },
  },
];

export default function CareersPage() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'ar';
  void t;

  const countries = useCountries();
  const [dept, setDept] = React.useState<string>('all');

  const filtered = dept === 'all' ? OPENINGS : OPENINGS.filter((o) => o.dept === dept);

  return (
    <>
      <PageHero
        eyebrow={isRTL ? 'انضم إلى الفريق' : 'Careers'}
        title={
          isRTL ? (
            <>
              شارك في <GradientText>تشكيل الضوء</GradientText>
            </>
          ) : (
            <>
              Shape <GradientText>how the world lights up</GradientText>
            </>
          )
        }
        description={
          isRTL
            ? 'نبحث دائماً عن مصممين ومهندسين ومبدعين يحوّلون الفراغات إلى تجارب لا تُنسى عبر أربع دول.'
            : "We're always on the lookout for designers, engineers, and makers who turn interiors into unforgettable experiences across four countries."
        }
      >
        <div className="flex flex-wrap items-center gap-3">
          <NeonButton asChild size="lg">
            <a href="#openings">
              <Briefcase className="size-4" />
              {isRTL ? 'الوظائف المتاحة' : 'View open roles'}
            </a>
          </NeonButton>
          <a
            href="#apply"
            className="inline-flex items-center gap-2 text-sm text-[color:var(--fg-muted)] transition-colors hover:text-[color:var(--brand-gold)]"
          >
            {isRTL ? 'إرسال سيرة ذاتية' : 'Send open application'}
            <ArrowUpRight className="size-4" />
          </a>
        </div>
      </PageHero>

      {/* Values */}
      <section className="relative pb-20 md:pb-28">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-10">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--brand-gold)]">
                {isRTL ? 'قيمنا' : 'How we work'}
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
                {isRTL ? 'قيم تشكّل كل قرار' : 'Principles behind every decision'}
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <ScrollReveal key={v.en} delay={i * 0.05}>
                <SpotlightCard className="h-full p-6">
                  <span className="flex size-10 items-center justify-center rounded-xl border border-[color:var(--brand-gold)]/30 bg-[color:var(--brand-gold)]/10 text-[color:var(--brand-gold)]">
                    <Sparkles className="size-5" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-[color:var(--fg-default)]">
                    {isRTL ? v.ar : v.en}
                  </h3>
                  <p className="mt-2 text-sm text-[color:var(--fg-muted)]">
                    {isRTL ? v.desc.ar : v.desc.en}
                  </p>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Locations band */}
      {countries.length > 0 && (
        <section className="relative pb-20 md:pb-28">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="mb-8">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--brand-gold)]">
                  {isRTL ? 'مكاتبنا' : 'Our offices'}
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
                  {isRTL ? 'نعمل عبر أربع دول' : 'We ship from four hubs'}
                </h2>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {countries.map((c, i) => (
                <ScrollReveal key={c.id} delay={i * 0.05}>
                  <GlassCard className="flex items-center gap-3 p-4">
                    <span className="flex size-10 items-center justify-center rounded-xl border border-[color:var(--glass-border)] text-[color:var(--brand-gold)]">
                      <MapPin className="size-4" />
                    </span>
                    <div>
                      <p className="font-display text-sm font-semibold">
                        {isRTL ? c.name_ar || c.name_en : c.name_en}
                      </p>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--fg-subtle)]">
                        {isRTL ? c.firm_name_ar || c.firm_name_en : c.firm_name_en}
                      </p>
                    </div>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Open roles */}
      <section id="openings" className="relative pb-20 md:pb-28">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--brand-gold)]">
                  {isRTL ? 'الوظائف الشاغرة' : 'Open roles'}
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
                  {isRTL ? 'وظائف يمكنك التقديم عليها' : 'Positions we’re hiring for'}
                </h2>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mb-6 flex flex-wrap gap-2">
              {[{ id: 'all', en: 'All', ar: 'الكل', icon: Briefcase }, ...DEPARTMENTS].map(
                (d) => {
                  const active = dept === d.id;
                  const Icon = d.icon;
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setDept(d.id)}
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] transition-all',
                        active
                          ? 'border-[color:var(--brand-gold)] bg-[color:var(--brand-gold)]/10 text-[color:var(--brand-gold)]'
                          : 'border-[color:var(--glass-border)] text-[color:var(--fg-muted)] hover:border-[color:var(--brand-gold)]/50 hover:text-[color:var(--fg-default)]',
                      )}
                    >
                      <Icon className="size-3.5" />
                      {isRTL ? d.ar : d.en}
                    </button>
                  );
                },
              )}
            </div>
          </ScrollReveal>

          <div className="grid gap-4">
            {filtered.length === 0 ? (
              <p className="py-10 text-center text-[color:var(--fg-muted)]">
                {isRTL
                  ? 'لا توجد وظائف في هذا القسم حالياً — ولكن يسعدنا استقبال سيرتك الذاتية.'
                  : 'No roles right now in this team — send us an open application anyway.'}
              </p>
            ) : (
              filtered.map((o, i) => (
                <motion.div
                  key={o.role.en}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.04 }}
                >
                  <a
                    href="#apply"
                    className={cn(
                      'group grid grid-cols-1 gap-4 rounded-2xl border border-[color:var(--glass-border)] bg-[color:var(--bg-elevated)] p-5 transition-all hover:-translate-y-0.5 hover:border-[color:var(--brand-gold)] hover:shadow-[0_12px_40px_-12px_rgba(201,169,79,0.3)] md:grid-cols-[1.5fr_1fr_1fr_auto] md:items-center md:p-6',
                    )}
                  >
                    <div>
                      <p className="font-display text-lg font-semibold text-[color:var(--fg-default)] md:text-xl">
                        {isRTL ? o.role.ar : o.role.en}
                      </p>
                      <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[color:var(--brand-gold)]">
                        {isRTL
                          ? DEPARTMENTS.find((d) => d.id === o.dept)?.ar
                          : DEPARTMENTS.find((d) => d.id === o.dept)?.en}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[color:var(--fg-muted)]">
                      <MapPin className="size-4 text-[color:var(--brand-gold)]" />
                      <span>{isRTL ? o.city.ar : o.city.en}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[color:var(--fg-muted)]">
                      <Clock className="size-4 text-[color:var(--brand-gold)]" />
                      <span>{isRTL ? o.type.ar : o.type.en}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.25em] text-[color:var(--brand-gold)]">
                      {isRTL ? 'تقدّم' : 'Apply'}
                      <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  </a>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Apply band */}
      <section id="apply" className="relative pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-70"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(194,50,74,0.2), transparent 60%)',
          }}
        />
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
          <div className="lg:col-span-2">
            <ScrollReveal>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--brand-gold)]">
                {isRTL ? 'ليست هناك وظيفة مناسبة؟' : "Don't see a perfect fit?"}
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
                <GradientText>
                  {isRTL ? 'راسلنا على أي حال' : 'Write to us anyway'}
                </GradientText>
              </h2>
              <p className="mt-4 text-[color:var(--fg-muted)]">
                {isRTL
                  ? 'إذا كنت تعتقد أنك ستضيف إلى فريقنا، نحن مهتمون بالتحدث معك.'
                  : 'If you think you would make the team sharper, we want to hear from you.'}
              </p>
              <ul className="mt-8 space-y-3 text-sm text-[color:var(--fg-muted)]">
                {(isRTL
                  ? [
                      'تعويض يتماشى مع السوق',
                      'ميزانية للتدريب والمعارض',
                      'سفر دوري بين المكاتب',
                      'بيئة عمل هادئة ومنضبطة',
                    ]
                  : [
                      'Market-matched compensation',
                      'Training and trade-show budget',
                      'Travel between international offices',
                      'Calm, high-craft working culture',
                    ]
                ).map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-[color:var(--brand-gold)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-3">
            <ScrollReveal direction="right">
              <GlassCard intensity="strong" className="p-6 md:p-8">
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="grid gap-4 sm:grid-cols-2"
                >
                  {(['name', 'email', 'phone'] as const).map((k) => (
                    <label key={k} className="block">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--fg-subtle)]">
                        {k === 'name'
                          ? isRTL
                            ? 'الاسم الكامل'
                            : 'Full name'
                          : k === 'email'
                          ? isRTL
                            ? 'البريد الإلكتروني'
                            : 'Email'
                          : isRTL
                          ? 'رقم الهاتف'
                          : 'Phone'}
                      </span>
                      <input
                        type={k === 'email' ? 'email' : k === 'phone' ? 'tel' : 'text'}
                        required={k !== 'phone'}
                        className="mt-1.5 w-full rounded-lg border border-[color:var(--glass-border)] bg-white/[0.02] px-3 py-2.5 text-sm text-[color:var(--fg-default)] placeholder:text-[color:var(--fg-subtle)] focus:border-[color:var(--brand-gold)] focus:outline-none"
                      />
                    </label>
                  ))}

                  <label className="block">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--fg-subtle)]">
                      {isRTL ? 'القسم' : 'Department'}
                    </span>
                    <select
                      className="mt-1.5 w-full rounded-lg border border-[color:var(--glass-border)] bg-white/[0.02] px-3 py-2.5 text-sm text-[color:var(--fg-default)] focus:border-[color:var(--brand-gold)] focus:outline-none"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        {isRTL ? 'اختر قسماً' : 'Pick a team'}
                      </option>
                      {DEPARTMENTS.map((d) => (
                        <option key={d.id} value={d.id}>
                          {isRTL ? d.ar : d.en}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="sm:col-span-2 block">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--fg-subtle)]">
                      {isRTL ? 'رابط الموقع الشخصي / LinkedIn' : 'Portfolio / LinkedIn URL'}
                    </span>
                    <input
                      type="url"
                      className="mt-1.5 w-full rounded-lg border border-[color:var(--glass-border)] bg-white/[0.02] px-3 py-2.5 text-sm text-[color:var(--fg-default)] placeholder:text-[color:var(--fg-subtle)] focus:border-[color:var(--brand-gold)] focus:outline-none"
                      placeholder="https://"
                    />
                  </label>

                  <label className="sm:col-span-2 block">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--fg-subtle)]">
                      {isRTL ? 'عرّف عن نفسك' : 'Tell us about you'}
                    </span>
                    <textarea
                      rows={4}
                      required
                      className="mt-1.5 w-full rounded-lg border border-[color:var(--glass-border)] bg-white/[0.02] px-3 py-2.5 text-sm text-[color:var(--fg-default)] placeholder:text-[color:var(--fg-subtle)] focus:border-[color:var(--brand-gold)] focus:outline-none"
                    />
                  </label>

                  <div className="sm:col-span-2 flex flex-wrap items-center gap-3">
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-[color:var(--glass-border)] px-4 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-[color:var(--fg-muted)] hover:border-[color:var(--brand-gold)] hover:text-[color:var(--fg-default)]">
                      <Upload className="size-4" />
                      {isRTL ? 'إرفاق سيرة ذاتية' : 'Attach CV (PDF)'}
                      <input type="file" accept=".pdf,.doc,.docx" className="hidden" />
                    </label>
                    <NeonButton type="submit" className="ms-auto">
                      <Send className="size-4" />
                      {isRTL ? 'أرسل طلبك' : 'Send application'}
                    </NeonButton>
                  </div>
                </form>
              </GlassCard>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
