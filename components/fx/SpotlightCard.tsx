import * as React from 'react';
import { cn } from '@/lib/utils';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  radius?: number;
}

/**
 * Lightweight card wrapper — no JS mouse tracking.
 */
export function SpotlightCard({
  className,
  children,
  color,
  radius,
  style,
  ...props
}: Props) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl',
        'glass-surface',
        className,
      )}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}

export default SpotlightCard;
