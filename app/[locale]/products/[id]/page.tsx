'use client';

import React from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowLeft, Package, Send, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Link } from '@/i18n/routing';

import { useProducts, useContactInfo, useCountries } from '@/context/SiteContentContext';
import { getImageUrl, submitContactForm } from '@/lib/api';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { GlassCard } from '@/components/fx/GlassCard';
import { GradientText } from '@/components/fx/GradientText';
import { NeonButton } from '@/components/fx/NeonButton';
import {
    buildProductEnquirySubject,
    buildProductEnquiryMessage,
    getProductDisplayName,
} from '@/lib/product-enquiry';
import { cn } from '@/lib/utils';

const FALLBACK =
    'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1600&q=80';

export default function ProductDetailPage() {
    const params = useParams();
    const locale = useLocale();
    const t = useTranslations();
    const isRTL = locale === 'ar';

    const products = useProducts();
    const countries = useCountries();
    const allContacts = useContactInfo();

    const productId = Number(params?.id);
    const product = products.find((p) => p.id === productId) ?? null;

    const pick = (en?: string | null, ar?: string | null) =>
        (isRTL ? ar || en : en || ar) || '';

    /* ---- Contact form state ---- */
    const formRef = React.useRef<HTMLFormElement>(null);
    const [sending, setSending] = React.useState(false);
    const [result, setResult] = React.useState<{ ok: boolean; msg: string } | null>(null);
    const [active, setActive] = React.useState<number | null>(null);

    const defaultSubject = product ? buildProductEnquirySubject(product, locale) : '';
    const defaultMessage = product ? buildProductEnquiryMessage(product, locale) : '';

    const branches = React.useMemo(() => {
        return countries.map((c) => {
            const ci = allContacts.find((x) => x.country_id === c.id);
            return {
                id: c.id,
                name: pick(c.name_en, c.name_ar),
                firm: pick(c.firm_name_en, c.firm_name_ar),
                email: ci?.email,
                phone: ci?.phone1,
                address: pick(ci?.address_en, ci?.address_ar),
                hours: pick(ci?.business_hours_en, ci?.business_hours_ar),
            };
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [countries, allContacts, isRTL]);

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
            setResult({
                ok: true,
                msg: isRTL ? 'تم إرسال رسالتك بنجاح!' : 'Message sent successfully!',
            });
            form.reset();
        } else {
            setResult({
                ok: false,
                msg: res.error || (isRTL ? 'حدث خطأ، يرجى المحاولة مرة أخرى.' : 'Something went wrong. Please try again.'),
            });
        }
    };

    /* ---- Not found ---- */
    if (products.length > 0 && !product) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
                <Package className="size-16 text-[color:var(--brand-gold)] opacity-40" />
                <h1 className="font-display text-3xl font-bold">
                    <GradientText>{isRTL ? 'المنتج غير موجود' : 'Product not found'}</GradientText>
                </h1>
                <NeonButton asChild size="md">
                    <Link href="/products">
                        <ArrowLeft className="size-4" />
                        {isRTL ? 'العودة للمنتجات' : 'Back to products'}
                    </Link>
                </NeonButton>
            </div>
        );
    }

    const title = product ? pick(product.name_en, product.name_ar) : '';
    const description = product ? pick(product.description_en, product.description_ar) : '';
    const imgSrc = product ? (getImageUrl(product.image_url) || FALLBACK) : FALLBACK;

    return (
        <>
            {/* ── Back breadcrumb ── */}
            <div className="mx-auto w-full max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
                <NeonButton asChild variant="ghost" size="sm">
                    <Link href="/products">
                        <ArrowLeft className="size-4" />
                        {isRTL ? 'العودة للمنتجات' : 'All products'}
                    </Link>
                </NeonButton>
            </div>

            {/* ── Product hero image ── */}
            <section className="relative mt-6 overflow-hidden">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    <ScrollReveal>
                        <div className="relative w-full overflow-hidden rounded-3xl border border-[color:var(--glass-border)]"
                            style={{ height: 'clamp(300px, 55vh, 600px)' }}>
                            <Image
                                src={imgSrc}
                                alt={title}
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, 90vw"
                                className="object-contain"
                                style={{ background: 'rgba(7,7,11,0.6)' }}
                            />
                            {/* Gradient overlay for title */}
                            <div
                                aria-hidden
                                className="absolute inset-0 rounded-3xl"
                                style={{
                                    background:
                                        'linear-gradient(180deg, rgba(7,7,11,0.0) 40%, rgba(7,7,11,0.85) 100%)',
                                }}
                            />
                            <div className="absolute inset-x-6 bottom-6 z-10">
                                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--brand-gold)]">
                                    {isRTL ? 'المنتج' : 'Product'}
                                </p>
                                <h1 className="mt-1 font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                                    {title}
                                </h1>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Description ── */}
            {description && (
                <section className="relative py-12">
                    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                        <ScrollReveal>
                            <GlassCard intensity="strong" className="p-6 md:p-10">
                                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--brand-gold)]">
                                    {isRTL ? 'وصف المنتج' : 'Product description'}
                                </p>
                                <p className="mt-4 text-base leading-relaxed text-[color:var(--fg-default)] md:text-lg">
                                    {description}
                                </p>
                            </GlassCard>
                        </ScrollReveal>
                    </div>
                </section>
            )}

            {/* ── Contact / Enquiry section ── */}
            <section className="relative pb-24 pt-4">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    <ScrollReveal className="mb-8">
                        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--brand-gold)]">
                            {isRTL ? 'تواصل معنا' : 'Get in touch'}
                        </p>
                        <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">
                            <GradientText>
                                {isRTL ? 'استفسر عن هذا المنتج' : 'Enquire about this product'}
                            </GradientText>
                        </h2>
                        <p className="mt-2 text-sm text-[color:var(--fg-muted)]">
                            {isRTL
                                ? 'سنعود إليك خلال 24 ساعة بالتفاصيل والأسعار.'
                                : "We'll get back to you within 24 hours with details and pricing."}
                        </p>
                    </ScrollReveal>

                    <div className="grid gap-10 lg:grid-cols-5">
                        {/* Country selector */}
                        <div className="lg:col-span-2">
                            <ScrollReveal direction="left">
                                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--fg-subtle)]">
                                    {isRTL ? 'اختر المنطقة (اختياري)' : 'Select region (optional)'}
                                </p>
                                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                                    {branches.map((b, i) => {
                                        const selected = active === b.id;
                                        return (
                                            <ScrollReveal key={b.id} delay={i * 0.05}>
                                                <div
                                                    onClick={() => setActive((x) => (x === b.id ? null : b.id))}
                                                    role="button"
                                                    tabIndex={0}
                                                    onKeyDown={(e) => e.key === 'Enter' && setActive((x) => (x === b.id ? null : b.id))}
                                                    className={cn(
                                                        'group relative cursor-pointer overflow-hidden rounded-2xl p-4 text-start transition-all duration-500 border',
                                                        selected
                                                            ? 'border-[color:var(--brand-gold)] bg-[rgba(201,169,79,0.08)] shadow-[0_0_24px_rgba(201,169,79,0.15)]'
                                                            : 'border-[color:var(--glass-border)] glass-surface hover:border-[color:var(--brand-gold)]',
                                                    )}
                                                >
                                                    <h3 className="font-display text-base font-semibold text-[color:var(--fg-default)] group-hover:text-[color:var(--brand-gold-bright)]">
                                                        {b.name}
                                                    </h3>
                                                    {b.firm && (
                                                        <p className="mt-0.5 text-xs text-[color:var(--fg-muted)]">{b.firm}</p>
                                                    )}
                                                    <div className="mt-3 space-y-1.5 text-xs text-[color:var(--fg-muted)]">
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
                                                        {b.hours && (
                                                            <div className="flex items-start gap-2">
                                                                <Clock className="mt-0.5 size-3 shrink-0 text-[color:var(--brand-gold)]" />
                                                                <span>{b.hours}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </ScrollReveal>
                                        );
                                    })}
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* Contact form */}
                        <div className="lg:col-span-3">
                            <ScrollReveal direction="right">
                                <GlassCard intensity="strong" className="p-6 md:p-8">
                                    {/* Product banner */}
                                    {product && (
                                        <div className="mb-5 flex items-start gap-3 rounded-xl border border-[color:var(--brand-gold)]/40 bg-[rgba(201,169,79,0.08)] px-4 py-3">
                                            <Package className="mt-0.5 size-5 shrink-0 text-[color:var(--brand-gold)]" />
                                            <p className="text-sm text-[color:var(--fg-default)]">
                                                {isRTL
                                                    ? `استفسار عن: ${getProductDisplayName(product, locale)}`
                                                    : `Enquiring about: ${getProductDisplayName(product, locale)}`}
                                            </p>
                                        </div>
                                    )}

                                    <h3 className="font-display text-xl font-bold md:text-2xl">
                                        <GradientText>{isRTL ? 'أرسل استفسارك' : 'Send your enquiry'}</GradientText>
                                    </h3>
                                    <p className="mt-1 text-sm text-[color:var(--fg-muted)]">
                                        {isRTL
                                            ? 'تفاصيل المنتج مُعبَّأة مسبقاً — أضف سؤالك وأرسل.'
                                            : 'Product details are pre-filled — just add your question and send.'}
                                    </p>

                                    <form ref={formRef} onSubmit={handleSubmit} className="mt-6 space-y-4">
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
                                                rows={6}
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
                </div>
            </section>
        </>
    );
}
