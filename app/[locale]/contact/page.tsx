'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  ArrowUpRight,
  Package,
} from 'lucide-react';

import {
  useContactInfo,
  useCountries,
  useProducts,
  useSocialLinks,
} from '@/context/SiteContentContext';
import { PageHero } from '@/components/sections/PageHero';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { GlassCard } from '@/components/fx/GlassCard';
import { GradientText } from '@/components/fx/GradientText';
import { NeonButton } from '@/components/fx/NeonButton';
import { cn } from '@/lib/utils';
import { submitContactForm } from '@/lib/api';
import {
  PRODUCT_ENQUIRY_PARAM,
  buildProductEnquiryMessage,
  buildProductEnquirySubject,
  getProductDisplayName,
} from '@/lib/product-enquiry';
import { useRouter } from '@/i18n/routing';

export default function ContactPage() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const searchParams = useSearchParams();
  const router = useRouter();
  const products = useProducts();

  const countries = useCountries();
  const allContacts = useContactInfo();
  useSocialLinks();

  const pick = (en?: string | null, ar?: string | null) =>
    (isRTL ? ar || en : en || ar) || '';

  /** Hide CMS placeholder strings so they're never shown to visitors. */
  const isValid = (v?: string | null): v is string =>
    typeof v === 'string' && v.length > 0 && !/(to be added|information|placeholder)/i.test(v);

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

  const productParam = searchParams.get(PRODUCT_ENQUIRY_PARAM);
  const enquiryProduct = React.useMemo(() => {
    if (!productParam) return null;
    const id = Number.parseInt(productParam, 10);
    if (!Number.isFinite(id)) return null;
    return products.find((p) => p.id === id) ?? null;
  }, [productParam, products]);

  const enquiryProductName = enquiryProduct
    ? getProductDisplayName(enquiryProduct, locale)
    : '';
  const defaultSubject = enquiryProduct
    ? buildProductEnquirySubject(enquiryProduct, locale)
    : '';
  const defaultMessage = enquiryProduct
    ? buildProductEnquiryMessage(enquiryProduct, locale)
    : '';

  const formRef = React.useRef<HTMLFormElement>(null);
  const formSectionRef = React.useRef<HTMLDivElement>(null);
  const [sending, setSending] = React.useState(false);
  const [result, setResult] = React.useState<{ ok: boolean; msg: string } | null>(null);

  React.useEffect(() => {
    if (!enquiryProduct || !formSectionRef.current) return;
    const timer = window.setTimeout(() => {
      formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
    return () => window.clearTimeout(timer);
  }, [enquiryProduct]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    setSending(true);
    setResult(null);

    const fd = new FormData(form);
    const res = await submitContactForm({
      name: fd.get('name') as string,
      email: fd.get('email') as string,
      phone: (fd.get('phone') as string) || undefined,
      subject: (fd.get('subject') as string) || undefined,
      message: fd.get('message') as string,
      country_id: active ?? undefined,
    });

    setSending(false);
    if (res.success) {
      setResult({ ok: true, msg: isRTL ? 'تم إرسال رسالتك بنجاح!' : 'Message sent successfully!' });
      form.reset();
      if (productParam) {
        router.replace('/contact');
      }
    } else {
      const errMsg = res.error || (isRTL ? 'حدث خطأ، يرجى المحاولة مرة أخرى.' : 'Something went wrong. Please try again.');
      console.error('Form submission failed:', res.error);
      setResult({ ok: false, msg: errMsg });
    }
  };

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
                    <div
                      onClick={() => setActive((x) => (x === b.id ? null : b.id))}
                      data-cursor-label={b.name}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && setActive((x) => (x === b.id ? null : b.id))}
                      className={cn(
                        'group relative block w-full cursor-pointer overflow-hidden rounded-2xl p-5 text-start transition-all duration-500',
                        'border',
                        selected
                          ? 'border-[color:var(--brand-gold)] bg-[rgba(201,169,79,0.08)] shadow-[0_0_30px_rgba(201,169,79,0.15)]'
                          : 'border-[color:var(--glass-border)] glass-surface hover:border-[color:var(--brand-gold)]',
                      )}
                    >
                      {/* Gold glow on hover */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute -right-16 -top-16 size-36 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                        style={{
                          background:
                            'radial-gradient(closest-side, rgba(212,168,67,0.3), transparent 70%)',
                        }}
                      />
                      <div className="flex items-center justify-between">
                        <h3 className="font-display text-xl font-semibold text-[color:var(--fg-default)] group-hover:text-accent">
                          {b.name}
                        </h3>
                        <ArrowUpRight className="size-4 text-[color:var(--fg-subtle)] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                      </div>
                      {b.firm && (
                        <p className="mt-1 text-xs text-[color:var(--fg-muted)]">{b.firm}</p>
                      )}
                      <div className="mt-4 space-y-2 text-xs text-[color:var(--fg-muted)]">
                        {isValid(b.phone) && (
                          <a
                            href={`tel:${b.phone.replace(/\s+/g, '')}`}
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-2 transition-colors hover:text-accent"
                          >
                            <Phone className="size-3 text-accent" />
                            <span>{b.phone}</span>
                          </a>
                        )}
                        {isValid(b.email) && (
                          <a
                            href={`mailto:${b.email}`}
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-2 transition-colors hover:text-accent"
                          >
                            <Mail className="size-3 text-accent" />
                            <span className="truncate">{b.email}</span>
                          </a>
                        )}
                        {isValid(b.address) && (
                          <div className="flex items-start gap-2">
                            <MapPin className="mt-0.5 size-3 shrink-0 text-accent" />
                            <span className="line-clamp-2">{b.address}</span>
                          </div>
                        )}
                        {!isValid(b.phone) && !isValid(b.email) && !isValid(b.address) && (
                          <span className="inline-flex items-center border border-accent/25 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-accent">
                            {isRTL ? 'قريباً' : 'Coming soon'}
                          </span>
                        )}
                      </div>
                    </div>
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
                    { icon: <Mail className="size-4" />, label: t('contact.email'), value: t('contact.emailValue'), href: `mailto:${t('contact.emailValue')}` },
                    { icon: <Phone className="size-4" />, label: t('contact.phoneNumbers'), value: `${t('contact.phone1')}${t('contact.phone2') ? ' · ' + t('contact.phone2') : ''}`, href: `tel:${t('contact.phone1').replace(/\s+/g, '')}` },
                    { icon: <MapPin className="size-4" />, label: t('contact.address'), value: t('contact.addressLine'), href: null },
                    { icon: <Clock className="size-4" />, label: t('contact.businessHours'), value: t('contact.hours'), href: null },
                  ].map((c, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-[color:var(--glass-border)] text-[color:var(--brand-gold)]">
                        {c.icon}
                      </span>
                      <div className="min-w-0">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--fg-subtle)]">
                          {c.label}
                        </p>
                        {c.href ? (
                          <a href={c.href} className="mt-0.5 block text-sm text-[color:var(--fg-default)] hover:text-[color:var(--brand-gold)] transition-colors">
                            {c.value}
                          </a>
                        ) : (
                          <p className="mt-0.5 text-sm text-[color:var(--fg-default)]">{c.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </ScrollReveal>
          </div>

          {/* Form */}
          <div ref={formSectionRef} id="contact-form" className="lg:col-span-2 scroll-mt-28">
            <ScrollReveal direction="right">
              <GlassCard intensity="strong" className="p-6 md:p-8">
                {enquiryProduct && (
                  <div className="mb-5 flex items-start gap-3 rounded-xl border border-[color:var(--brand-gold)]/40 bg-[rgba(201,169,79,0.08)] px-4 py-3">
                    <Package className="mt-0.5 size-5 shrink-0 text-[color:var(--brand-gold)]" />
                    <p className="text-sm text-[color:var(--fg-default)]">
                      {t('contact.productEnquiry.banner', { product: enquiryProductName })}
                    </p>
                  </div>
                )}

                <h2 className="font-display text-2xl font-bold md:text-3xl">
                  <GradientText>
                    {enquiryProduct
                      ? t('contact.productEnquiry.formTitle')
                      : activeBranch
                      ? `${isRTL ? 'اكتب إلى' : 'Message'} ${activeBranch.name}`
                      : isRTL
                      ? 'اكتب لنا'
                      : 'Send us a message'}
                  </GradientText>
                </h2>
                <p className="mt-2 text-sm text-[color:var(--fg-muted)]">
                  {enquiryProduct
                    ? t('contact.productEnquiry.formSubtitle')
                    : isRTL
                    ? 'سنعود إليك خلال 24 ساعة.'
                    : "We'll get back to you within 24 hours."}
                </p>

                <form
                  key={productParam ?? 'general'}
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="mt-6 space-y-4"
                >
                  {['name', 'email', 'phone', 'subject'].map((k) => (
                    <label key={k} className="block">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--fg-subtle)]">
                        {t(`contact.form.${k}`)}
                      </span>
                      <input
                        name={k}
                        type={k === 'email' ? 'email' : k === 'phone' ? 'tel' : 'text'}
                        required={k === 'name' || k === 'email'}
                        defaultValue={k === 'subject' ? defaultSubject : undefined}
                        className="mt-1.5 w-full rounded-lg border border-[color:var(--glass-border)] bg-white/[0.02] px-3 py-2.5 text-sm text-[color:var(--fg-default)] placeholder:text-[color:var(--fg-subtle)] focus:border-[color:var(--brand-gold)] focus:outline-none"
                      />
                    </label>
                  ))}
                  <label className="block">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--fg-subtle)]">
                      {t('contact.form.message')}
                    </span>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      defaultValue={defaultMessage}
                      className="mt-1.5 w-full rounded-lg border border-[color:var(--glass-border)] bg-white/[0.02] px-3 py-2.5 text-sm text-[color:var(--fg-default)] placeholder:text-[color:var(--fg-subtle)] focus:border-[color:var(--brand-gold)] focus:outline-none"
                    />
                  </label>
                  <NeonButton type="submit" size="lg" className="w-full" disabled={sending}>
                    <Send className="size-4" />
                    {sending
                      ? (isRTL ? 'جاري الإرسال...' : 'Sending...')
                      : t('contact.form.sendMessage')}
                  </NeonButton>

                  {result && (
                    <p className={cn(
                      'mt-3 text-center text-sm font-medium',
                      result.ok ? 'text-green-400' : 'text-red-400',
                    )}>
                      {result.msg}
                    </p>
                  )}
                </form>
              </GlassCard>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
