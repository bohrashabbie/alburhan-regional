'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  shimmer?: boolean;
}

/**
 * Dark-glass shimmer placeholder. Used for CMS-driven sections that are
 * still loading (home page bento, product grid, etc.).
 */
export function Skeleton({ className, shimmer = true, ...rest }: Props) {
  return (
    <div
      aria-hidden
      className={cn(
        'relative overflow-hidden rounded-lg bg-white/[0.04]',
        'border border-[color:var(--glass-border)]',
        shimmer && 'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2.2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent',
        className,
      )}
      {...rest}
    />
  );
}

export default Skeleton;
