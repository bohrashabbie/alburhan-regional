'use client';

import Image from 'next/image';
import { useServices, useProducts, useProjectCategories } from '@/context/SiteContentContext';
import { getImageUrl } from '@/lib/api';

/**
 * Hero image collage — pulls real images from the CMS (services, products,
 * project categories). Falls back to a gradient if no images are available.
 */
export function Hero3D({ className }: { className?: string }) {
  const services = useServices();
  const products = useProducts();
  const categories = useProjectCategories();

  // Collect up to 4 CMS images
  const pool = [
    ...services.map((s) => ({ url: s.image_url, label: s.title_en })),
    ...categories.map((c) => ({ url: c.cover_image_url, label: c.name_en })),
    ...products.map((p) => ({ url: p.image_url, label: p.name_en })),
  ]
    .map((item) => ({ src: getImageUrl(item.url), label: item.label || '' }))
    .filter((item): item is { src: string; label: string } => Boolean(item.src));

  const imgs = pool.slice(0, 3);

  // Fallback if no CMS images yet
  if (imgs.length === 0) {
    return (
      <div className={className}>
        <div className="relative h-full w-full">
          <div
            aria-hidden
            className="absolute inset-0 rounded-3xl"
            style={{
              background:
                'radial-gradient(closest-side, rgba(194,50,74,0.45), transparent 70%)',
              filter: 'blur(50px)',
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="relative grid h-full w-full grid-cols-2 grid-rows-2 gap-3 p-2">
        {/* Ambient glow behind the grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-8 -z-10 rounded-3xl"
          style={{
            background:
              'radial-gradient(closest-side, rgba(194,50,74,0.35), transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        {/* Main image — tall left */}
        <div className="relative row-span-2 overflow-hidden rounded-2xl border border-[color:var(--glass-border)]">
          <Image
            src={imgs[0].src}
            alt={imgs[0].label}
            fill
            sizes="(max-width: 768px) 50vw, 260px"
            className="object-cover"
            unoptimized
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[rgba(7,7,11,0.6)] to-transparent" />
        </div>

        {/* Top right */}
        {imgs[1] && (
          <div className="relative overflow-hidden rounded-2xl border border-[color:var(--glass-border)]">
            <Image
              src={imgs[1].src}
              alt={imgs[1].label}
              fill
              sizes="(max-width: 768px) 50vw, 260px"
              className="object-cover"
              unoptimized
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[rgba(7,7,11,0.6)] to-transparent" />
          </div>
        )}

        {/* Bottom right */}
        {imgs[2] && (
          <div className="relative overflow-hidden rounded-2xl border border-[color:var(--glass-border)]">
            <Image
              src={imgs[2].src}
              alt={imgs[2].label}
              fill
              sizes="(max-width: 768px) 50vw, 260px"
              className="object-cover"
              unoptimized
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[rgba(7,7,11,0.6)] to-transparent" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Hero3D;
