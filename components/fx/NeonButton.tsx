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
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg-base)]',
    'disabled:pointer-events-none disabled:opacity-40',
    'overflow-hidden isolate',
  ],
  {
    variants: {
      variant: {
        primary: [
          'text-black font-semibold',
          'bg-[#D4A843]',
          'border border-[#D4A843]',
          'hover:bg-[#C49730] hover:-translate-y-0.5',
          'hover:shadow-[0_12px_32px_-12px_rgba(212,168,67,0.6)]',
        ],
        ghost: [
          'text-[color:var(--fg-default)]',
          'border border-[color:var(--glass-border)] bg-white/[0.02]',
          'hover:border-[color:var(--brand-gold)] hover:bg-[rgba(201,169,79,0.08)] hover:text-[color:var(--brand-gold-bright)]',
        ],
        outline: [
          'text-[color:var(--brand-gold)]',
          'border border-[color:var(--brand-gold)]/60',
          'hover:border-[color:var(--brand-gold)] hover:bg-[rgba(201,169,79,0.1)]',
          'hover:shadow-[0_0_22px_rgba(201,169,79,0.35)]',
        ],
        link: [
          'text-[color:var(--brand-gold-bright)] px-0 py-0',
          'underline-offset-4 hover:underline',
        ],
      },
      size: {
        sm: 'h-9 px-4 text-sm rounded-lg',
        md: 'h-11 px-6 text-sm rounded-xl',
        lg: 'h-14 px-8 text-base rounded-2xl',
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
