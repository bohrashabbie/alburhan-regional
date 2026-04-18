'use client';

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  ArrowUpRight,
} from 'lucide-react';

import {
  useContactInfo,
  useCountries,
  useSocialLinks,
} from '@/context/SiteContentContext';
import { PageHero } from '@/components/sections/PageHero';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { GlassCard } from '@/components/fx/GlassCard';
import { GradientText } from '@/components/fx/GradientText';
import { NeonButton } from '@/components/fx/NeonButton';
import { cn } from '@/lib/utils';

export default function ContactPage() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const countries = useCountries();
  const allContacts = useContactInfo();
  useSocialLinks();

  const pick = (en?: string | null, ar?: string | null) =>
    (isRTL ? ar || en : en || ar) || '';

  const branches = React.useMemo(() => {
    return countries.map((c) => {
      const ci = allContacts.find((x) => x.country_id === c.id);
      return {
        id: c.id,
        slug: c.slug,
        name: pick(c.name_en, c.name_ar),
        firm: pick(c.firm_name_en, c.firm_name_ar),
        email: ci?.email,
        phone: ci?.phone1,
        phone2: ci?.phone2,
        address: pick(ci?.address_en, ci?.address_ar),
        hours: pick(ci?.business_hours_en, ci?.business_hours_ar),
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countries, allContacts, isRTL]);

  const [active, setActive] = React.useState<number | null>(null);
  const activeBranch = active ? branches.find((b) => b.id === active) : null;

  return (
    <>
      <PageHero
        eyebrow={isRTL ? 'نحن هنا' : 'Get in touch'}
        title={t('contactPage.title')}
        description={t('contactPage.subtitle')}
      />

      <section className="relative pb-24">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-5 lg:gap-12 lg:px-8">
          {/* Offices */}
          <div className="lg:col-span-3">
            <ScrollReveal>
              <div className="mb-6 flex items-center justify-between">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--brand-gold)]">
                  {t('contact.ourLocations')}
                </p>
              </div>
            </ScrollReveal>

            <div className="grid gap-4 sm:grid-cols-2">
              {branches.map((b, i) => {
                const selected = active === b.id;
                return (
                  <ScrollReveal key={b.id} delay={i * 0.05}>
                    <button
                      type="button"
                      onClick={() => setActive((x) => (x === b.id ? null : b.id))}
                      data-cursor-label={b.name}
                      className={cn(
                        'group relative block w-full overflow-hidden rounded-2xl p-5 text-start transition-all duration-500',
                        'border',
                        selected
                          ? 'border-[color:var(--brand-gold)] bg-[rgba(201,169,79,0.08)] shadow-[0_0_30px_rgba(201,169,79,0.15)]'
                          : 'border-[color:var(--glass-border)] glass-surface hover:border-[color:var(--brand-gold)]',
                      )}
                    >
                      <div
                        aria-hidden
                        className="pointer-events-none absolute -right-16 -top-16 size-36 rounded-full opacity-50 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                        style={{
                          background:
                            'radial-gradient(closest-side, rgba(194,50,74,0.55), transparent 70%)',
                        }}
                      />
                      <div className="flex items-center justify-between">
                        <h3 className="font-display text-xl font-semibold text-[color:var(--fg-default)] group-hover:text-[color:var(--brand-gold-bright)]">
                          {b.name}
                        </h3>
                        <ArrowUpRight className="size-4 text-[color:var(--fg-subtle)] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[color:var(--brand-gold)]" />
                      </div>
                      {b.firm && (
                        <p className="mt-1 text-xs text-[color:var(--fg-muted)]">{b.firm}</p>
                      )}
                      <div className="mt-4 space-y-2 text-xs text-[color:var(--fg-muted)]">
                        {b.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="size-3 text-[color:var(--brand-gold)]" />
                            <span>{b.phone}</span>
                          </div>
                        )}
                        {b.email && (
                          <div className="flex items-center gap-2">
                            <Mail className="size-3 text-[color:var(--brand-gold)]" />
                            <span className="truncate">{b.email}</span>
                          </div>
                        )}
                        {b.address && (
                          <div className="flex items-start gap-2">
                            <MapPin className="mt-0.5 size-3 shrink-0 text-[color:var(--brand-gold)]" />
                            <span className="line-clamp-2">{b.address}</span>
                          </div>
                        )}
                      </div>
                    </button>
                  </ScrollReveal>
                );
              })}
            </div>

            {/* Head office details card */}
            <ScrollReveal className="mt-6">
              <GlassCard intensity="strong" className="p-6">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--brand-gold)]">
                  {t('contact.headOffice')}
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {[
                    { icon: <Mail className="size-4" />, label: t('contact.email'), value: t('contact.emailValue') },
                    { icon: <Phone className="size-4" />, label: t('contact.phoneNumbers'), value: `${t('contact.phone1')}${t('contact.phone2') ? ' · ' + t('contact.phone2') : ''}` },
                    { icon: <MapPin className="size-4" />, label: t('contact.address'), value: t('contact.addressLine') },
                    { icon: <Clock className="size-4" />, label: t('contact.businessHours'), value: t('contact.hours') },
                  ].map((c, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-[color:var(--glass-border)] text-[color:var(--brand-gold)]">
                        {c.icon}
                      </span>
                      <div className="min-w-0">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--fg-subtle)]">
                          {c.label}
                        </p>
                        <p className="mt-0.5 text-sm text-[color:var(--fg-default)]">{c.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </ScrollReveal>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <ScrollReveal direction="right">
              <GlassCard intensity="strong" className="p-6 md:p-8">
                <h2 className="font-display text-2xl font-bold md:text-3xl">
                  <GradientText>
                    {activeBranch
                      ? `${isRTL ? 'اكتب إلى' : 'Message'} ${activeBranch.name}`
                      : isRTL
                      ? 'اكتب لنا'
                      : 'Send us a message'}
                  </GradientText>
                </h2>
                <p className="mt-2 text-sm text-[color:var(--fg-muted)]">
                  {isRTL
                    ? 'سنعود إليك خلال 24 ساعة.'
                    : "We'll get back to you within 24 hours."}
                </p>

                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="mt-6 space-y-4"
                >
                  {['name', 'email', 'phone', 'subject'].map((k) => (
                    <label key={k} className="block">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--fg-subtle)]">
                        {t(`contact.form.${k}`)}
                      </span>
                      <input
                        type={k === 'email' ? 'email' : k === 'phone' ? 'tel' : 'text'}
                        required={k === 'name' || k === 'email'}
                        className="mt-1.5 w-full rounded-lg border border-[color:var(--glass-border)] bg-white/[0.02] px-3 py-2.5 text-sm text-[color:var(--fg-default)] placeholder:text-[color:var(--fg-subtle)] focus:border-[color:var(--brand-gold)] focus:outline-none"
                      />
                    </label>
                  ))}
                  <label className="block">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--fg-subtle)]">
                      {t('contact.form.message')}
                    </span>
                    <textarea
                      rows={5}
                      required
                      className="mt-1.5 w-full rounded-lg border border-[color:var(--glass-border)] bg-white/[0.02] px-3 py-2.5 text-sm text-[color:var(--fg-default)] placeholder:text-[color:var(--fg-subtle)] focus:border-[color:var(--brand-gold)] focus:outline-none"
                    />
                  </label>
                  <NeonButton type="submit" size="lg" className="w-full">
                    <Send className="size-4" />
                    {t('contact.form.sendMessage')}
                  </NeonButton>
                </form>
              </GlassCard>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
