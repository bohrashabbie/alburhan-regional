'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/utils/motion';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  /** Opacity multiplier for the blobs (0–1). */
  intensity?: number;
  /** Hide the grid pattern. */
  noGrid?: boolean;
  /** Hide the film-grain noise. */
  noNoise?: boolean;
}

/**
 * Full-bleed animated background with drifting burgundy + gold blobs,
 * a soft grid, and a noise overlay. Meant to be placed inside a
 * position: relative parent (or use `fixed` via className).
 */
export function AuroraBackground({
  className,
  intensity = 1,
  noGrid,
  noNoise,
  children,
  ...props
}: Props) {
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden={!children}
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden bg-[color:var(--bg-base)]',
        !noNoise && 'bg-noise',
        className,
      )}
      {...props}
    >
      {/* Burgundy blob */}
      <div
        className="absolute -top-1/3 -left-1/4 h-[70vmax] w-[70vmax] rounded-full blur-[120px]"
        style={{
          background:
            'radial-gradient(closest-side, rgba(194,50,74,0.55), rgba(194,50,74,0) 70%)',
          opacity: 0.55 * intensity,
          animation: reduced ? undefined : 'aurora 22s linear infinite',
        }}
      />
      {/* Gold blob */}
      <div
        className="absolute -bottom-1/3 -right-1/4 h-[65vmax] w-[65vmax] rounded-full blur-[120px]"
        style={{
          background:
            'radial-gradient(closest-side, rgba(201,169,79,0.45), rgba(201,169,79,0) 70%)',
          opacity: 0.5 * intensity,
          animation: reduced ? undefined : 'aurora 26s linear infinite reverse',
        }}
      />
      {/* Deep-burgundy center */}
      <div
        className="absolute top-1/3 left-1/2 h-[55vmax] w-[55vmax] -translate-x-1/2 rounded-full blur-[120px]"
        style={{
          background:
            'radial-gradient(closest-side, rgba(74,15,24,0.75), rgba(74,15,24,0) 72%)',
          opacity: 0.6 * intensity,
          animation: reduced ? undefined : 'aurora 34s linear infinite',
        }}
      />
      {/* Grid */}
      {!noGrid && (
        <div
          className="absolute inset-0 bg-grid-soft opacity-[0.6]"
          style={{
            animation: reduced ? undefined : 'grid-drift 45s linear infinite',
            maskImage:
              'radial-gradient(ellipse at center, black 40%, transparent 80%)',
            WebkitMaskImage:
              'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          }}
        />
      )}
      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 55%, rgba(7,7,11,0.9) 100%)',
        }}
      />
      {children}
    </div>
  );
}

export default AuroraBackground;
