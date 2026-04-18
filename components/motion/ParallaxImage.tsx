import * as React from 'react';
import NextImage, { type ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

interface Props extends Omit<ImageProps, 'placeholder'> {
  shift?: number;
  direction?: 'up' | 'down';
  containerClassName?: string;
}

/**
 * Static image wrapper — same API as before but no scroll-linked JS transforms.
 */
export function ParallaxImage({
  shift,
  direction,
  containerClassName,
  className,
  alt,
  ...rest
}: Props) {
  return (
    <div className={cn('relative overflow-hidden', containerClassName)}>
      <NextImage
        alt={alt || ''}
        className={cn('object-cover', className)}
        {...rest}
      />
    </div>
  );
}

export default ParallaxImage;
