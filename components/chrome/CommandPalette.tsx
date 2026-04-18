'use client';

import * as React from 'react';
import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, Info, Phone, Briefcase, Wrench, Package, Globe, Flag, FileText, ShieldCheck,
  Cookie, ArrowRight, Search, Users, Award,
} from 'lucide-react';
import { useProjectCategories, useCountries, useServices, useProducts } from '@/context/SiteContentContext';
import { cn } from '@/lib/utils';

interface Entry {
  id: string;
  label: string;
  hint?: string;
  href: string;
  icon: React.ReactNode;
  group: 'pages' | 'countries' | 'services' | 'products' | 'projects';
}

/**
 * Global command palette (⌘K / Ctrl K). Lets the user jump to any
 * public route or CMS entity instantly.
 */
export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const projectCategories = useProjectCategories();
  const countries = useCountries();
  const services = useServices();
  const products = useProducts();

  // Safe t() — returns the fallback if the key is missing.
  // Uses `has()` to avoid next-intl logging missing-key errors.
  const t = useTranslations();
  const safeT = (k: string, fb: string) => {
    try {
      const has = (t as unknown as { has?: (k: string) => boolean }).has;
      if (has && !has.call(t, k)) return fb;
      const v = t(k);
      return v || fb;
    } catch {
      return fb;
    }
  };

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const nav = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const base = `/${locale}`;

  const entries: Entry[] = React.useMemo(() => {
    const list: Entry[] = [
      { id: 'home', group: 'pages', label: safeT('header.home', 'Home'), href: `${base}`, icon: <Home className="size-4" /> },
      { id: 'about', group: 'pages', label: safeT('header.aboutUs', 'About Us'), href: `${base}/about`, icon: <Info className="size-4" /> },
      { id: 'projects', group: 'pages', label: safeT('header.ourProjects', 'Our Projects'), href: `${base}/projects`, icon: <Briefcase className="size-4" /> },
      { id: 'services', group: 'pages', label: safeT('header.services', 'Services'), href: `${base}/services`, icon: <Wrench className="size-4" /> },
      { id: 'products', group: 'pages', label: safeT('header.ourProducts', 'Products'), href: `${base}/products`, icon: <Package className="size-4" /> },
      { id: 'contact', group: 'pages', label: safeT('header.contact', 'Contact'), href: `${base}/contact`, icon: <Phone className="size-4" /> },
      { id: 'case', group: 'pages', label: 'Case Studies', href: `${base}/case-studies`, icon: <Award className="size-4" /> },
      { id: 'careers', group: 'pages', label: 'Careers', href: `${base}/careers`, icon: <Users className="size-4" /> },
      { id: 'terms', group: 'pages', label: 'Terms of Service', href: `${base}/terms`, icon: <FileText className="size-4" /> },
      { id: 'privacy', group: 'pages', label: 'Privacy Policy', href: `${base}/privacy`, icon: <ShieldCheck className="size-4" /> },
      { id: 'cookies', group: 'pages', label: 'Cookies Policy', href: `${base}/cookies`, icon: <Cookie className="size-4" /> },
    ];

    (countries || []).forEach((c: any) => {
      const name = isRTL ? c.name_ar || c.name_en : c.name_en || c.name_ar;
      const slug = c.slug || (c.name_en || '').toLowerCase().replace(/\s+/g, '-');
      if (!slug) return;
      list.push({
        id: `country-${c.id}`,
        group: 'countries',
        label: name,
        hint: 'Country',
        href: `${base}/${slug}`,
        icon: <Flag className="size-4" />,
      });
    });
    (services || []).forEach((s: any) => {
      const name = isRTL ? s.title_ar || s.title_en : s.title_en || s.title_ar;
      list.push({
        id: `service-${s.id}`,
        group: 'services',
        label: name,
        hint: 'Service',
        href: `${base}/services`,
        icon: <Wrench className="size-4" />,
      });
    });
    (products || []).slice(0, 30).forEach((p: any) => {
      const name = isRTL ? p.title_ar || p.title_en : p.title_en || p.title_ar;
      list.push({
        id: `product-${p.id}`,
        group: 'products',
        label: name,
        hint: 'Product',
        href: `${base}/products`,
        icon: <Package className="size-4" />,
      });
    });
    (projectCategories || []).forEach((cat: any) => {
      const name = isRTL ? cat.name_ar || cat.name_en : cat.name_en || cat.name_ar;
      list.push({
        id: `cat-${cat.id}`,
        group: 'projects',
        label: name,
        hint: 'Project category',
        href: `${base}/projects`,
        icon: <Globe className="size-4" />,
      });
    });
    return list;
  }, [base, countries, services, products, projectCategories, isRTL]);

  const groupNames: Record<Entry['group'], string> = {
    pages: 'Pages',
    countries: 'Countries',
    services: 'Services',
    products: 'Products',
    projects: 'Project Categories',
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[950] grid place-items-start justify-center pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <div
            aria-hidden
            className="absolute inset-0 bg-[rgba(3,3,6,0.7)] backdrop-blur-md"
            onClick={() => setOpen(false)}
          />
          <motion.div
            role="dialog"
            aria-label="Command palette"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.19, 1, 0.22, 1] }}
            className={cn(
              'relative z-10 w-[min(680px,92vw)] overflow-hidden',
              'glass-surface-strong rounded-2xl border border-[color:var(--glass-border-strong)]',
              'shadow-[0_30px_120px_-20px_rgba(0,0,0,0.8)]',
            )}
          >
            <Command
              label="Global command palette"
              className="flex flex-col"
              loop
            >
              <div className="flex items-center gap-3 border-b border-[color:var(--glass-border)] px-5 py-4">
                <Search className="size-4 text-[color:var(--brand-gold)]" />
                <Command.Input
                  placeholder="Search pages, countries, services, products…"
                  className="flex-1 bg-transparent text-sm text-[color:var(--fg-default)] placeholder:text-[color:var(--fg-subtle)] focus:outline-none"
                  autoFocus
                />
                <kbd className="hidden rounded border border-[color:var(--glass-border)] px-1.5 py-0.5 text-[10px] font-medium uppercase text-[color:var(--fg-muted)] md:inline-block">
                  Esc
                </kbd>
              </div>
              <Command.List className="max-h-[60vh] overflow-y-auto p-2">
                <Command.Empty className="px-4 py-10 text-center text-sm text-[color:var(--fg-muted)]">
                  Nothing found.
                </Command.Empty>
                {(Object.keys(groupNames) as Entry['group'][]).map((g) => {
                  const items = entries.filter((e) => e.group === g);
                  if (!items.length) return null;
                  return (
                    <Command.Group
                      key={g}
                      heading={groupNames[g]}
                      className="mb-2 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.2em] [&_[cmdk-group-heading]]:text-[color:var(--fg-subtle)]"
                    >
                      {items.map((e) => (
                        <Command.Item
                          key={e.id}
                          value={`${e.label} ${e.hint ?? ''}`}
                          onSelect={() => nav(e.href)}
                          className={cn(
                            'group flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[color:var(--fg-default)]',
                            'data-[selected=true]:bg-[rgba(194,50,74,0.15)] data-[selected=true]:text-white',
                            'transition-colors',
                          )}
                        >
                          <span className="flex size-8 items-center justify-center rounded-lg bg-white/5 text-[color:var(--brand-gold)]">
                            {e.icon}
                          </span>
                          <span className="flex-1">{e.label}</span>
                          {e.hint && (
                            <span className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--fg-subtle)]">
                              {e.hint}
                            </span>
                          )}
                          <ArrowRight className="size-4 opacity-0 transition-opacity group-data-[selected=true]:opacity-100" />
                        </Command.Item>
                      ))}
                    </Command.Group>
                  );
                })}
              </Command.List>
              <div className="flex items-center justify-between border-t border-[color:var(--glass-border)] px-5 py-3 text-[11px] uppercase tracking-[0.2em] text-[color:var(--fg-subtle)]">
                <span>AL-BURHAN · Command</span>
                <span>
                  <kbd className="mx-1 rounded border border-[color:var(--glass-border)] px-1.5 py-0.5 text-[10px]">↑</kbd>
                  <kbd className="mx-1 rounded border border-[color:var(--glass-border)] px-1.5 py-0.5 text-[10px]">↓</kbd>
                  navigate ·
                  <kbd className="mx-1 rounded border border-[color:var(--glass-border)] px-1.5 py-0.5 text-[10px]">↵</kbd>
                  open
                </span>
              </div>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CommandPalette;
