'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'brand' | 'gold';
  as?: keyof React.JSX.IntrinsicElements;
}

export function GradientText({
  className,
  variant = 'brand',
  as: Tag = 'span',
  children,
  ...props
}: Props) {
  const Comp = Tag as unknown as React.ComponentType<
    React.HTMLAttributes<HTMLSpanElement>
  >;
  return (
    <Comp
      className={cn(
        variant === 'brand' ? 'text-gradient-brand' : 'text-gradient-gold',
        'font-semibold',
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

export default GradientText;
