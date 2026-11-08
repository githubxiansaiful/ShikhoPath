import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold tracking-tight transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-[#EDEBFD] text-[#5B4AE6]',
        primary: 'bg-[#5B4AE6] text-white shadow-2xs',
        secondary: 'bg-[#F1F5F9] text-[#475569]',
        success: 'bg-emerald-50 text-emerald-700 border border-emerald-200/80',
        warning: 'bg-amber-50 text-amber-700 border border-amber-200/80',
        error: 'bg-rose-50 text-rose-700 border border-rose-200/80',
        outline: 'border border-[#E2E8F0] text-[#64748B] bg-white',
        premium: 'bg-gradient-to-r from-amber-500 to-indigo-600 text-white shadow-xs',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
