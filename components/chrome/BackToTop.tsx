'use client';

import * as React from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BackToTop() {
  const { scrollYProgress } = useScroll();
  const pathLen = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.28, ease: [0.19, 1, 0.22, 1] }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          data-cursor-label="Top"
          className={cn(
            'fixed bottom-6 right-6 z-[700] size-12',
            'rounded-full glass-surface-strong',
            'flex items-center justify-center',
            'text-[color:var(--brand-gold-bright)]',
            'hover:text-white hover:bg-[rgba(194,50,74,0.4)]',
            'transition-colors duration-300',
            'shadow-[0_0_22px_rgba(201,169,79,0.25)]',
          )}
        >
          <svg
            aria-hidden
            viewBox="0 0 36 36"
            className="pointer-events-none absolute inset-0 size-full -rotate-90"
          >
            <circle
              cx="18"
              cy="18"
              r="16"
              stroke="rgba(201,169,79,0.18)"
              strokeWidth="1.5"
              fill="none"
            />
            <motion.circle
              cx="18"
              cy="18"
              r="16"
              stroke="var(--brand-gold)"
              strokeWidth="1.5"
              fill="none"
              pathLength="1"
              style={{ pathLength: pathLen }}
              strokeLinecap="round"
            />
          </svg>
          <ArrowUp className="size-4" strokeWidth={2.4} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default BackToTop;
