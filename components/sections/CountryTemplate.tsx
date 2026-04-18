'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Globe,
  Send,
} from 'lucide-react';

import { Link } from '@/i18n/routing';
import {
  useProjectCategories,
  useSiteContent,
  useContactInfo,
} from '@/context/SiteContentContext';
import { getImageUrl } from '@/lib/api';
import { cn } from '@/lib/utils';

import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { GlassCard } from '@/components/fx/GlassCard';
import { GradientText } from '@/components/fx/GradientText';
import { NeonButton } from '@/components/fx/NeonButton';
import { ProjectLightbox } from '@/components/projects/ProjectLightbox';

/**
 * Location / branch card as shown in the contact section.
 */
export interface CountryLocation {
  title: string;
  address?: React.ReactNode;
  phone?: string;
  email?: string;
  website?: string;
}

interface Props {
  /** CMS slug to look up country from SiteContentContext (uae/kuwait/china/egypt). */
  countrySlug: string;
  /**
   * i18n key used for `aboutUs.<key>.firmName | countryName | description`.
   * Note: UAE translations live under "dubai".
   */
  i18nKey: string;
  /** Fallback hero image if CMS country has no image. */
  fallbackImage: string;
  /** Fallback logo if CMS country has no logo. */
  fallbackLogo: string;
  /** One-or-many branch/office cards shown in the "Our Locations" band. */
  locations: CountryLocation[];
  /** Optional description override (some countries have no aboutUs.description). */
  descriptionKey?: string;
}

export function CountryTemplate({
  countrySlug,
  i18nKey,
  fallbackImage,
  fallbackLogo,
  locations,
  descriptionKey,
}: Props) {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const { countryBySlug } = useSiteContent();
  const country = countryBySlug(countrySlug);
  const countryImage = getImageUrl(country?.country_image_url) || fallbackImage;
  const countryLogo = getImageUrl(country?.logo_url) || fallbackLogo;

  const firmName =
    (isRTL && country?.firm_name_ar) ||
    country?.firm_name_en ||
    t(`aboutUs.${i18nKey}.firmName`);
  const countryName =
    (isRTL && country?.name_ar) ||
    country?.name_en ||
    t(`aboutUs.${i18nKey}.countryName`);

  const description = React.useMemo(() => {
    const key = descriptionKey || `aboutUs.${i18nKey}.description`;
    try {
      const value = t(key);
      return value && !value.startsWith(key) ? value : '';
    } catch {
      return '';
    }
  }, [descriptionKey, i18nKey, t]);

  /* ---------------- Projects from CMS ---------------- */
  const cmsCategories = useProjectCategories();

  const projectsByCategory = React.useMemo(() => {
    const cid = country?.id;
    const cats = [...(cmsCategories || [])]
      .filter((c) => c.is_active !== false)
      .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));

    return cats
      .map((cat) => {
        const catName =
          (isRTL ? cat.name_ar || cat.name_en : cat.name_en) || '';
        const projects = [...(cat.projects || [])]
          .filter((p) => p.is_active !== false)
          .filter((p) => p.country_id == null || p.country_id === cid)
          .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
          .map((project) => {
            const imgs = [...(project.images || [])]
              .filter((i) => i.is_active !== false)
              .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
              .map((img) => getImageUrl(img.image_url))
              .filter((u): u is string => !!u);
            if (imgs.length === 0) return null;
            const name =
              (isRTL ? project.name_ar || project.name_en : project.name_en) ||
              '';
            return { name, images: imgs, firstImage: imgs[0] };
          })
          .filter(
            (p): p is { name: string; images: string[]; firstImage: string } =>
              !!p,
          );
        return { categoryName: catName, projects };
      })
      .filter((g) => g.projects.length > 0);
  }, [cmsCategories, isRTL, country?.id]);

  /* ---------------- Contact (also from CMS when available) ---------------- */
  const allContacts = useContactInfo();
  const ci = country ? allContacts.find((x) => x.country_id === country.id) : undefined;

  return (
    <div className="flex min-h-screen flex-col">
      {/* ==================== HERO ==================== */}
      <section className="relative h-[60vh] min-h-[440px] w-full overflow-hidden md:h-[72vh]">
        <Image
          src={countryImage}
          alt={countryName}
          fill
          priority
          unoptimized
          className="object-cover"
        />

        {/* layered gradients / glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,6,14,0.35) 0%, rgba(10,6,14,0.55) 55%, rgba(10,6,14,0.95) 100%)',
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 20% 80%, rgba(194,50,74,0.35), transparent 55%), radial-gradient(ellipse at 85% 10%, rgba(201,169,79,0.22), transparent 50%)',
          }}
        />

        {/* floating logo badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          className={cn(
            'absolute top-24 z-10 size-20 overflow-hidden rounded-2xl border backdrop-blur-xl md:size-24',
            isRTL ? 'left-4 md:left-8' : 'right-4 md:right-8',
          )}
          style={{
            background: 'rgba(255,255,255,0.06)',
            borderColor: 'rgba(201,169,79,0.35)',
            boxShadow:
              '0 0 0 1px rgba(201,169,79,0.15), 0 20px 60px -20px rgba(0,0,0,0.5)',
          }}
        >
          <Image
            src={countryLogo}
            alt={`${firmName} logo`}
            fill
            unoptimized
            className="object-contain p-3"
          />
        </motion.div>

        {/* title + subtitle */}
        <div className="absolute inset-x-0 bottom-0 z-10 pb-12 md:pb-20">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-mono text-xs uppercase tracking-[0.4em] text-[color:var(--brand-gold)]"
            >
              Al-Burhan · {countryName}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mt-4 font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl xl:text-8xl"
            >
              <GradientText>{firmName}</GradientText>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-3 max-w-xl font-display text-2xl font-light uppercase tracking-[0.15em] text-white/90 md:text-3xl"
            >
              {countryName}
            </motion.p>
          </div>
        </div>

        {/* gold hairline */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 mx-auto h-px w-[80%]"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(201,169,79,0.7), transparent)',
          }}
        />
      </section>

      {/* ==================== BACK LINK ==================== */}
      <section className="relative pt-8">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className={cn(
              'inline-flex items-center gap-2 rounded-full border border-[color:var(--glass-border)] px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-[color:var(--fg-muted)] transition-all hover:border-[color:var(--brand-gold)] hover:text-[color:var(--brand-gold)]',
              isRTL && 'flex-row-reverse',
            )}
          >
            <ArrowLeft className={cn('size-4', isRTL && 'rotate-180')} />
            {isRTL ? 'العودة إلى الرئيسية' : 'Back to Home'}
          </Link>
        </div>
      </section>

      {/* ==================== DESCRIPTION ==================== */}
      {description && (
        <section className="relative py-16 md:py-24">
          <div className="mx-auto w-full max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <ScrollReveal>
              <p className="font-mono text-xs uppercase tracking-[0.35em] text-[color:var(--brand-gold)]">
                {isRTL ? 'لمحة عنّا' : 'Our story in'} {countryName}
              </p>
              <p className="mx-auto mt-6 text-lg leading-relaxed text-[color:var(--fg-muted)] md:text-xl">
                {description}
              </p>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ==================== PROJECTS ==================== */}
      <section id="projects" className="relative py-12 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-10 text-center">
              <p className="font-mono text-xs uppercase tracking-[0.35em] text-[color:var(--brand-gold)]">
                {isRTL ? 'أعمالنا' : 'Portfolio'}
              </p>
              <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
                <GradientText>{t('sections.ourProjects')}</GradientText>
              </h2>
            </div>
          </ScrollReveal>

          {projectsByCategory.length === 0 ? (
            <div className="py-10 text-center text-[color:var(--fg-muted)]">
              {isRTL
                ? 'لا توجد مشاريع متاحة حالياً.'
                : 'No projects are available at the moment.'}
            </div>
          ) : (
            projectsByCategory.map(({ categoryName, projects }) => (
              <div key={categoryName} className="mb-14 last:mb-0">
                <ScrollReveal>
                  <h3 className="mb-6 font-display text-2xl font-semibold text-[color:var(--fg-default)] md:text-3xl">
                    {categoryName}
                  </h3>
                </ScrollReveal>
                <ProjectLightbox projects={projects} />
              </div>
            ))
          )}
        </div>
      </section>

      {/* ==================== LOCATIONS ==================== */}
      <section className="relative py-16 md:py-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-10 text-center">
              <p className="font-mono text-xs uppercase tracking-[0.35em] text-[color:var(--brand-gold)]">
                {locations.length > 1
                  ? t('contact.ourLocations')
                  : t('contact.ourLocation')}
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
                <GradientText>
                  {isRTL ? 'نحن هنا' : 'Find us in'} {countryName}
                </GradientText>
              </h2>
            </div>
          </ScrollReveal>

          <div
            className={cn(
              'mx-auto grid gap-5',
              locations.length > 1
                ? 'md:grid-cols-2'
                : 'max-w-3xl grid-cols-1',
            )}
          >
            {locations.map((loc, i) => (
              <ScrollReveal key={loc.title + i} delay={i * 0.06}>
                <GlassCard intensity="strong" className="group h-full p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[color:var(--brand-gold)]/30 bg-[color:var(--brand-gold)]/10 text-[color:var(--brand-gold)]">
                      <MapPin className="size-5" />
                    </span>
                    <h3 className="font-display text-lg font-semibold text-[color:var(--fg-default)] group-hover:text-[color:var(--brand-gold-bright)]">
                      {loc.title}
                    </h3>
                  </div>

                  <div className="mt-5 space-y-4 text-sm">
                    {loc.address && (
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--fg-subtle)]">
                          {t('contact.address')}
                        </p>
                        <div className="mt-1 leading-relaxed text-[color:var(--fg-default)]">
                          {loc.address}
                        </div>
                      </div>
                    )}
                    {loc.phone && (
                      <div className="flex items-center gap-2 text-[color:var(--fg-default)]">
                        <Phone className="size-4 text-[color:var(--brand-gold)]" />
                        <span dir="ltr">{loc.phone}</span>
                      </div>
                    )}
                    {loc.email && (
                      <div className="flex items-center gap-2 text-[color:var(--fg-default)]">
                        <Mail className="size-4 text-[color:var(--brand-gold)]" />
                        <span className="break-all" dir="ltr">{loc.email}</span>
                      </div>
                    )}
                    {loc.website && (
                      <div className="flex items-center gap-2 text-[color:var(--fg-default)]">
                        <Globe className="size-4 text-[color:var(--brand-gold)]" />
                        <span dir="ltr">{loc.website}</span>
                      </div>
                    )}
                  </div>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CONTACT FORM ==================== */}
      <section className="relative py-16 md:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-60"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(194,50,74,0.2), transparent 55%)',
          }}
        />
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
          <div className="lg:col-span-2">
            <ScrollReveal>
              <p className="font-mono text-xs uppercase tracking-[0.35em] text-[color:var(--brand-gold)]">
                {isRTL ? 'تواصل معنا' : 'Get in touch'}
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
                <GradientText>{t('contact.title')}</GradientText>
              </h2>
              <p className="mt-4 text-[color:var(--fg-muted)]">
                {t('contact.subtitle')}
              </p>

              <div className="mt-8 space-y-3 text-sm">
                {(ci?.phone1 || locations[0]?.phone) && (
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-xl border border-[color:var(--glass-border)] text-[color:var(--brand-gold)]">
                      <Phone className="size-4" />
                    </span>
                    <span dir="ltr">{ci?.phone1 || locations[0]?.phone}</span>
                  </div>
                )}
                {(ci?.email || locations[0]?.email) && (
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-xl border border-[color:var(--glass-border)] text-[color:var(--brand-gold)]">
                      <Mail className="size-4" />
                    </span>
                    <span dir="ltr">{ci?.email || locations[0]?.email}</span>
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-3">
            <ScrollReveal direction="right">
              <GlassCard intensity="strong" className="p-6 md:p-8">
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="grid gap-4 sm:grid-cols-2"
                >
                  {(['name', 'email', 'phone', 'subject'] as const).map(
                    (k) => (
                      <label key={k} className="block">
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--fg-subtle)]">
                          {t(`contact.form.${k}`)}
                        </span>
                        <input
                          type={
                            k === 'email'
                              ? 'email'
                              : k === 'phone'
                              ? 'tel'
                              : 'text'
                          }
                          required={k === 'name' || k === 'email'}
                          className="mt-1.5 w-full rounded-lg border border-[color:var(--glass-border)] bg-white/[0.02] px-3 py-2.5 text-sm text-[color:var(--fg-default)] placeholder:text-[color:var(--fg-subtle)] focus:border-[color:var(--brand-gold)] focus:outline-none"
                        />
                      </label>
                    ),
                  )}
                  <label className="sm:col-span-2 block">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--fg-subtle)]">
                      {t('contact.form.message')}
                    </span>
                    <textarea
                      rows={5}
                      required
                      className="mt-1.5 w-full rounded-lg border border-[color:var(--glass-border)] bg-white/[0.02] px-3 py-2.5 text-sm text-[color:var(--fg-default)] placeholder:text-[color:var(--fg-subtle)] focus:border-[color:var(--brand-gold)] focus:outline-none"
                    />
                  </label>
                  <div className="sm:col-span-2">
                    <NeonButton type="submit" size="lg" className="w-full">
                      <Send className="size-4" />
                      {t('contact.form.sendMessage')}
                    </NeonButton>
                  </div>
                </form>
              </GlassCard>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CountryTemplate;
