import * as React from 'react';
import { cn } from '@/lib/utils';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  max?: number;
  scale?: number;
  gloss?: boolean;
}

/**
 * Lightweight card wrapper — visual styling only, no JS-driven animations.
 */
export function TiltCard({ className, children, max, scale, gloss, ...props }: Props) {
  return (
    <div className={cn('relative', className)} {...props}>
      {children}
    </div>
  );
}

export default TiltCard;
