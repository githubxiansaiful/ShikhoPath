'use client';

import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-white group-[.toaster]:text-[#191827] group-[.toaster]:border-[#E8E8F0] group-[.toaster]:shadow-lg group-[.toaster]:rounded-xl font-sans',
          description: 'group-[.toast]:text-[#77758A]',
          actionButton:
            'group-[.toast]:bg-[#8068D8] group-[.toast]:text-white group-[.toast]:font-semibold group-[.toast]:rounded-lg',
          cancelButton:
            'group-[.toast]:bg-[#F8F8FC] group-[.toast]:text-[#77758A] group-[.toast]:rounded-lg',
          error:
            'group-[.toaster]:border-red-200 group-[.toaster]:bg-red-50/50 group-[.toast]:text-red-900',
          success:
            'group-[.toaster]:border-emerald-200 group-[.toaster]:bg-emerald-50/50 group-[.toast]:text-emerald-900',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
