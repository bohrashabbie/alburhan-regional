'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/utils/motion';

interface Props {
  /** Strings to cycle through. */
  words: string[];
  /** Typing speed in ms per character. */
  typeMs?: number;
  /** Delay before deleting the word, in ms. */
  holdMs?: number;
  /** Deleting speed in ms per character. */
  deleteMs?: number;
  className?: string;
  cursorClassName?: string;
}

/**
 * Classic typewriter effect: types each word, pauses, deletes, repeats.
 * On reduced-motion it just shows the first word.
 */
export function TypewriterText({
  words,
  typeMs = 75,
  holdMs = 1400,
  deleteMs = 40,
  className,
  cursorClassName,
}: Props) {
  const reduced = useReducedMotion();
  const [i, setI] = React.useState(0);
  const [text, setText] = React.useState('');
  const [phase, setPhase] = React.useState<'typing' | 'holding' | 'deleting'>('typing');

  React.useEffect(() => {
    if (reduced) {
      setText(words[0] ?? '');
      return;
    }
    if (!words.length) return;
    const word = words[i % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === 'typing') {
      if (text.length < word.length) {
        timeout = setTimeout(() => setText(word.slice(0, text.length + 1)), typeMs);
      } else {
        timeout = setTimeout(() => setPhase('holding'), 0);
      }
    } else if (phase === 'holding') {
      timeout = setTimeout(() => setPhase('deleting'), holdMs);
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(word.slice(0, text.length - 1)), deleteMs);
      } else {
        setPhase('typing');
        setI((x) => x + 1);
      }
    }
    return () => clearTimeout(timeout);
  }, [text, phase, i, words, typeMs, holdMs, deleteMs, reduced]);

  return (
    <span className={cn('inline-flex items-baseline', className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={text + phase}
          initial={reduced ? false : { opacity: 0.6 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.6 }}
          className="whitespace-pre"
        >
          {text || '\u00A0'}
        </motion.span>
      </AnimatePresence>
      <span
        className={cn(
          'ml-1 inline-block h-[1em] w-[2px] bg-[color:var(--brand-gold)] align-middle',
          cursorClassName,
        )}
        style={{
          animation: reduced ? undefined : 'pulse-glow 1.1s ease-in-out infinite',
        }}
      />
    </span>
  );
}

export default TypewriterText;
