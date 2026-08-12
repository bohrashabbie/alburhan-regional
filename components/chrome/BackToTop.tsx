'use client';

import * as React from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Floating back-to-top button — pure CSS, no Framer Motion.
 * Appears after 300 px of scroll.
 */
export function BackToTop() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={cn(
        'fixed bottom-6 end-6 z-[900] size-10 rounded-full',
        'flex items-center justify-center',
        'border border-line bg-canvas text-ink shadow-[var(--shadow-2)]',
        'transition-all duration-300',
        'hover:border-accent hover:text-accent',
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none',
      )}
    >
      <ArrowUp className="size-3.5" strokeWidth={2.5} />
    </button>
  );
}

export default BackToTop;
