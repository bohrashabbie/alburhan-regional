'use client';

import * as React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import NextImage, { type ImageProps } from 'next/image';
import { cn } from '@/lib/utils';
import { useCanUseRichMotion } from '@/utils/motion';

interface Props extends Omit<ImageProps, 'placeholder'> {
  /** How far the image drifts (in pixels). */
  shift?: number;
  /** Direction of drift. */
  direction?: 'up' | 'down';
  containerClassName?: string;
}

export function ParallaxImage({
  shift = 60,
  direction = 'up',
  containerClassName,
  className,
  alt,
  ...rest
}: Props) {
  const wrap = React.useRef<HTMLDivElement | null>(null);
  const active = useCanUseRichMotion();
  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ['start end', 'end start'],
  });
  const range = direction === 'up' ? [shift, -shift] : [-shift, shift];
  const y = useTransform(scrollYProgress, [0, 1], active ? range : [0, 0]);

  return (
    <div
      ref={wrap}
      className={cn('relative overflow-hidden', containerClassName)}
    >
      <motion.div style={{ y }} className="relative h-full w-full">
        <NextImage
          alt={alt || ''}
          className={cn('object-cover', className)}
          {...rest}
        />
      </motion.div>
    </div>
  );
}

export default ParallaxImage;
