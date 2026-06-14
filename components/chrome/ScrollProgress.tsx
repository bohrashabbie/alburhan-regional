'use client';

import * as React from 'react';
import { useScrollProgress } from '@/hooks/useScrollProgress';

/**
 * 2 px gold bar pinned at the very top of the viewport.
 * Width is driven by scroll position — no Framer Motion.
 */
export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-[2px] bg-[#D4A843]"
      style={{ width: `${progress}%`, transition: 'none' }}
    />
  );
}

export default ScrollProgress;
