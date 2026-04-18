'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { useCanUseRichMotion } from '@/utils/motion';

const Scene = dynamic(() => import('./HeroScene3D'), {
  ssr: false,
  loading: () => null,
});

/**
 * Feature-flagged 3D hero visual. Falls back to a pure CSS glowing
 * gradient on mobile + reduced-motion so the initial JS stays light.
 */
export function Hero3D({ className }: { className?: string }) {
  const rich = useCanUseRichMotion();

  if (!rich) {
    return (
      <div className={className}>
        <div className="relative h-full w-full">
          <div
            aria-hidden
            className="absolute inset-0 rounded-full blur-3xl"
            style={{
              background:
                'radial-gradient(closest-side, rgba(194,50,74,0.75), transparent 70%)',
            }}
          />
          <div
            aria-hidden
            className="absolute inset-8 rounded-full blur-2xl"
            style={{
              background:
                'radial-gradient(closest-side, rgba(201,169,79,0.55), transparent 65%)',
            }}
          />
          <div
            aria-hidden
            className="absolute inset-16 rounded-full border border-[color:var(--brand-gold)]/40"
            style={{
              boxShadow:
                '0 0 40px rgba(201,169,79,0.35), inset 0 0 30px rgba(194,50,74,0.35)',
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <Scene />
    </div>
  );
}

export default Hero3D;
