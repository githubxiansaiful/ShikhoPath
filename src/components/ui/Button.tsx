import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-150 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary:
          'bg-[#5B4AE6] text-white hover:bg-[#4535C5] shadow-xs hover:shadow-md focus-visible:ring-[#5B4AE6]',
        secondary:
          'bg-[#EDEBFD] text-[#5B4AE6] hover:bg-[#DDD8FA] dark:bg-[#1E1B4B] dark:text-indigo-300 dark:hover:bg-[#2E2850] focus-visible:ring-[#5B4AE6]',
        outline:
          'border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#111827] text-[#0F172A] dark:text-[#F8FAFC] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] hover:border-[#CBD5E1] dark:hover:border-[#475569] shadow-2xs focus-visible:ring-[#5B4AE6]',
        ghost:
          'text-[#475569] dark:text-[#94A3B8] hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] hover:text-[#0F172A] dark:hover:text-white',
        danger:
          'bg-[#EF4444] text-white hover:bg-[#DC2626] shadow-xs focus-visible:ring-[#EF4444]',
        success:
          'bg-[#10B981] text-white hover:bg-[#059669] shadow-xs focus-visible:ring-[#10B981]',
      },
      size: {
        sm: 'h-8 px-3 text-xs rounded-lg',
        md: 'h-10 px-4 py-2 text-xs sm:text-sm',
        lg: 'h-11 sm:h-12 px-6 text-sm sm:text-base font-bold',
        icon: 'h-9 w-9 p-0 rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
