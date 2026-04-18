import * as React from 'react';
import { cn } from '@/lib/utils';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  strength?: number;
}

/**
 * Simple inline wrapper — keeps the same API but zero runtime cost.
 */
export function MagneticButton({ className, strength, children, ...props }: Props) {
  return (
    <div className={cn('inline-block', className)} {...props}>
      {children}
    </div>
  );
}

export default MagneticButton;
