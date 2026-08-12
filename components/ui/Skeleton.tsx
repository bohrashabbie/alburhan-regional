'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  shimmer?: boolean;
}

/**
 * Shimmer placeholder for CMS-driven sections that are still loading.
 * Built from surface/line tokens so it reads correctly in both themes — the
 * old white-alpha fill was invisible on a light canvas.
 */
export function Skeleton({ className, shimmer = true, ...rest }: Props) {
  return (
    <div
      aria-hidden
      className={cn(
        'relative overflow-hidden rounded-sm bg-surface-2 border border-line',
        shimmer && 'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2.2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-canvas/60 before:to-transparent',
        className,
      )}
      {...rest}
    />
  );
}

export default Skeleton;
