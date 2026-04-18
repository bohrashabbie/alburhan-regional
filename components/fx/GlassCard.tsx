'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

type Intensity = 'soft' | 'normal' | 'strong';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  intensity?: Intensity;
  glow?: 'none' | 'burgundy' | 'gold';
  as?: keyof React.JSX.IntrinsicElements;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, intensity = 'normal', glow = 'none', as: Tag = 'div', ...props }, ref) => {
    const intensityClass =
      intensity === 'soft'
        ? 'bg-[rgba(20,19,30,0.4)] border-white/5 backdrop-blur-md'
        : intensity === 'strong'
        ? 'glass-surface-strong'
        : 'glass-surface';

    const glowClass =
      glow === 'burgundy' ? 'neon-burgundy' : glow === 'gold' ? 'neon-gold' : '';

    const Comp = Tag as unknown as React.ComponentType<
      React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
    >;

    return (
      <Comp
        ref={ref}
        className={cn(
          'relative rounded-2xl transition-shadow duration-500',
          intensityClass,
          glowClass,
          className,
        )}
        {...props}
      />
    );
  },
);
GlassCard.displayName = 'GlassCard';

export default GlassCard;
