'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  /** Base tile size in px. */
  size?: number;
  /** Fade the grid toward the edges. */
  masked?: boolean;
}

export function GridBackdrop({ className, size = 48, masked = true, ...props }: Props) {
  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute inset-0', className)}
      style={{
        backgroundImage: `linear-gradient(var(--line) 1px, transparent 1px),
                          linear-gradient(90deg, var(--line) 1px, transparent 1px)`,
        backgroundSize: `${size}px ${size}px`,
        maskImage: masked
          ? 'radial-gradient(ellipse at center, black 45%, transparent 85%)'
          : undefined,
        WebkitMaskImage: masked
          ? 'radial-gradient(ellipse at center, black 45%, transparent 85%)'
          : undefined,
      }}
      {...props}
    />
  );
}

export default GridBackdrop;
