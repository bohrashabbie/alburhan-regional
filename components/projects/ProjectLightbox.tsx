'use client';

import * as React from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LightboxProject {
  name: string;
  images: string[];
  firstImage: string;
}

interface Props {
  projects: LightboxProject[];
}

/**
 * Dark-glass project grid with full-screen lightbox.
 * Replaces the old MUI ProjectGallery.
 */
export function ProjectLightbox({ projects }: Props) {
  const [active, setActive] = React.useState<LightboxProject | null>(null);
  const [index, setIndex] = React.useState(0);

  const open = React.useCallback((p: LightboxProject) => {
    setActive(p);
    setIndex(0);
  }, []);

  const close = React.useCallback(() => setActive(null), []);

  const next = React.useCallback(() => {
    if (!active) return;
    setIndex((i) => (i + 1) % active.images.length);
  }, [active]);

  const prev = React.useCallback(() => {
    if (!active) return;
    setIndex((i) => (i === 0 ? active.images.length - 1 : i - 1));
  }, [active]);

  React.useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active, close, next, prev]);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3 xl:grid-cols-4">
        {projects.map((p, i) => (
          <motion.button
            key={p.name + i}
            type="button"
            onClick={() => open(p)}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.6,
              delay: i * 0.06,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            data-cursor-label="View"
            className={cn(
              'group relative overflow-hidden rounded-2xl border text-start',
              'border-[color:var(--glass-border)] bg-[color:var(--bg-elevated)]',
              'h-[280px] sm:h-[320px] md:h-[360px] lg:h-[380px]',
              'transition-all duration-500',
              'hover:-translate-y-2 hover:border-[color:var(--brand-gold)] hover:shadow-[0_20px_60px_-20px_rgba(201,169,79,0.4)]',
            )}
          >
            <Image
              src={p.firstImage}
              alt={p.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              unoptimized
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(201,169,79,0.9), transparent)',
              }}
            />
            <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
              <p className="font-display text-base font-semibold text-white sm:text-lg">
                {p.name}
              </p>
              <div className="mt-1.5 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-[color:var(--brand-gold)]">
                <Eye className="size-3" />
                <span>View gallery</span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl"
            onClick={close}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 0%, rgba(194,50,74,0.2), transparent 60%)',
              }}
            />

            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 z-[201] flex size-11 items-center justify-center rounded-full border border-[color:var(--glass-border)] bg-white/5 text-white backdrop-blur hover:bg-white/10 md:right-6 md:top-6"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>

            <div className="pointer-events-none absolute left-4 top-4 z-[201] max-w-[60vw] rounded-full border border-[color:var(--glass-border)] bg-white/5 px-4 py-2 text-sm text-white backdrop-blur md:left-6 md:top-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--brand-gold)]">
                {index + 1} / {active.images.length}
              </span>
              <span className="ml-3 truncate">{active.name}</span>
            </div>

            <div
              className="relative flex h-full w-full items-center justify-center p-6 md:p-12"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 40, scale: 0.96 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -40, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="relative h-[75vh] w-[90vw] max-w-6xl"
                >
                  <Image
                    src={active.images[index]}
                    alt={`${active.name} — ${index + 1}`}
                    fill
                    sizes="90vw"
                    unoptimized
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {active.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      prev();
                    }}
                    className="absolute left-2 top-1/2 z-[201] flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-[color:var(--glass-border)] bg-white/5 text-white backdrop-blur transition-all hover:bg-white/10 md:left-6 md:size-14"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="size-6" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      next();
                    }}
                    className="absolute right-2 top-1/2 z-[201] flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-[color:var(--glass-border)] bg-white/5 text-white backdrop-blur transition-all hover:bg-white/10 md:right-6 md:size-14"
                    aria-label="Next"
                  >
                    <ChevronRight className="size-6" />
                  </button>

                  <div
                    className="absolute inset-x-0 bottom-4 z-[201] mx-auto flex max-w-full items-center justify-center gap-2 overflow-x-auto px-4 md:bottom-6"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {active.images.map((img, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIndex(i);
                        }}
                        className={cn(
                          'relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all',
                          i === index
                            ? 'border-[color:var(--brand-gold)] opacity-100'
                            : 'border-transparent opacity-50 hover:opacity-100',
                        )}
                      >
                        <Image
                          src={img}
                          alt=""
                          fill
                          sizes="56px"
                          unoptimized
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ProjectLightbox;
