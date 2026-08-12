'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

const neonButton = cva(
  [
    'relative inline-flex items-center justify-center gap-2',
    'font-medium tracking-wide whitespace-nowrap select-none',
    'transition-all duration-300 ease-out will-change-transform',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
    'disabled:pointer-events-none disabled:opacity-40',
    'overflow-hidden isolate',
  ],
  {
    variants: {
      variant: {
        primary: [
          'font-semibold text-accent-ink',
          'bg-accent border border-accent',
          'hover:bg-accent-dk hover:-translate-y-0.5 dark:hover:bg-accent-hi',
          'hover:shadow-[var(--shadow-2)]',
        ],
        ghost: [
          'text-ink',
          'border border-line bg-surface',
          'hover:border-accent hover:text-accent',
        ],
        outline: [
          'text-accent',
          'border border-accent/60',
          'hover:border-accent hover:bg-accent-soft',
        ],
        link: ['text-accent px-0 py-0', 'underline-offset-4 hover:underline'],
      },
      size: {
        sm: 'h-9 px-4 text-sm rounded-sm',
        md: 'h-11 px-6 text-sm rounded-sm',
        lg: 'h-14 px-8 text-base rounded-sm',
        icon: 'size-10 rounded-full p-0',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

export interface NeonButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof neonButton> {
  asChild?: boolean;
}

export const NeonButton = React.forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ className, variant, size, asChild, children, ...props }, ref) => {
    const Comp: React.ElementType = asChild ? Slot : 'button';
    return (
      <Comp ref={ref} className={cn(neonButton({ variant, size }), className)} {...props}>
        {children}
      </Comp>
    );
  },
);
NeonButton.displayName = 'NeonButton';

export default NeonButton;
