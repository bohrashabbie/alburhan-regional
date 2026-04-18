'use client';

import * as React from 'react';
import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import { EASE_EXPO, useReducedMotion } from '@/utils/motion';

type Direction = 'up' | 'down' | 'left' | 'right' | 'fade';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  direction?: Direction;
  distance?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
  as?: keyof React.JSX.IntrinsicElements;
}

const offsetFor = (d: Direction, dist: number) => {
  switch (d) {
    case 'up': return { y: dist };
    case 'down': return { y: -dist };
    case 'left': return { x: dist };
    case 'right': return { x: -dist };
    default: return {};
  }
};

export function ScrollReveal({
  direction = 'up',
  distance = 32,
  delay = 0,
  duration = 0.7,
  once = true,
  className,
  children,
  ...props
}: Props) {
  const reduced = useReducedMotion();
  const variants: Variants = {
    hidden: { opacity: 0, ...offsetFor(direction, distance) },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: reduced ? 0.01 : duration,
        delay: reduced ? 0 : delay,
        ease: EASE_EXPO,
      },
    },
  };

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      variants={variants}
      {...(props as any)}
    >
      {children}
    </motion.div>
  );
}

export default ScrollReveal;
