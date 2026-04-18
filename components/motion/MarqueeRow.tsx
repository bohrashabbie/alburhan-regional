'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/utils/motion';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  /** Seconds for one complete loop. */
  speed?: number;
  /** Pause on hover. */
  pauseOnHover?: boolean;
  /** Direction — LTR or RTL. */
  reverse?: boolean;
  /** Add fade masks at the edges. */
  fade?: boolean;
  children: React.ReactNode;
}

/**
 * Infinite horizontal marquee. Duplicates children once so the loop is seamless.
 */
export function MarqueeRow({
  speed = 30,
  pauseOnHover = true,
  reverse = false,
  fade = true,
  className,
  children,
  ...props
}: Props) {
  const reduced = useReducedMotion();

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={
        fade
          ? {
              maskImage:
                'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)',
              WebkitMaskImage:
                'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)',
            }
          : undefined
      }
      {...props}
    >
      <div
        className={cn(
          'flex w-max gap-12',
          pauseOnHover && 'hover:[animation-play-state:paused]',
        )}
        style={{
          animation: reduced
            ? undefined
            : `${reverse ? 'marquee-rtl' : 'marquee'} ${speed}s linear infinite`,
        }}
      >
        <div className="flex shrink-0 items-center gap-12">{children}</div>
        <div aria-hidden className="flex shrink-0 items-center gap-12">
          {children}
        </div>
      </div>
    </div>
  );
}

export default MarqueeRow;
