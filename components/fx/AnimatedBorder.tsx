'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  /** Border thickness in px. */
  thickness?: number;
  /** Rounded corners (tailwind rounded class). */
  rounded?: string;
  /** Animation duration in seconds. */
  duration?: number;
}

/**
 * Wraps content in an animated conic-gradient border
 * (burgundy → gold) that slowly rotates.
 */
export function AnimatedBorder({
  className,
  thickness = 1,
  rounded = 'rounded-2xl',
  duration = 6,
  children,
  ...props
}: Props) {
  return (
    <div
      className={cn('relative isolate', rounded, className)}
      style={{ padding: thickness }}
      {...props}
    >
      <div
        aria-hidden
        className={cn('absolute inset-0 -z-10', rounded)}
        style={{
          background:
            'conic-gradient(from 0deg, var(--brand-burgundy-bright), var(--brand-gold), var(--brand-burgundy), var(--brand-gold-bright), var(--brand-burgundy-bright))',
          animation: `spin ${duration}s linear infinite`,
        }}
      />
      <div className={cn('relative bg-[color:var(--bg-raised)]', rounded)}>
        {children}
      </div>
    </div>
  );
}

export default AnimatedBorder;
