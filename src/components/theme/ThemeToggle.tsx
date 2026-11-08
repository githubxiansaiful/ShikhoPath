'use client';

import React from 'react';
import { useTheme } from '@/lib/theme/ThemeContext';
import { Sun, Moon, Laptop } from 'lucide-react';

/**
 * Segmented Theme Toggle exactly matching the design in Screenshot_23.png:
 * [ Light | Dark | System ]
 */
export function ThemeSegmentedControl({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <div className={`space-y-1.5 ${className || ''}`}>
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-semibold text-[#64748B] dark:text-[#94A3B8]">
          Theme
        </span>
      </div>

      <div className="flex items-center p-1 rounded-xl bg-[#F1F5F9] dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] gap-1">
        {/* Light */}
        <button
          type="button"
          onClick={(e) => setTheme('light', e)}
          className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            theme === 'light'
              ? 'bg-white text-[#0F172A] shadow-xs dark:bg-white dark:text-[#0F172A]'
              : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white'
          }`}
        >
          <Sun className="w-3.5 h-3.5" />
          <span>Light</span>
        </button>

        {/* Dark */}
        <button
          type="button"
          onClick={(e) => setTheme('dark', e)}
          className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            theme === 'dark'
              ? 'bg-[#0F172A] text-white shadow-xs dark:bg-white dark:text-[#0F172A]'
              : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white'
          }`}
        >
          <Moon className="w-3.5 h-3.5" />
          <span>Dark</span>
        </button>

        {/* System */}
        <button
          type="button"
          onClick={(e) => setTheme('system', e)}
          className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            theme === 'system'
              ? 'bg-white text-[#0F172A] shadow-xs dark:bg-white dark:text-[#0F172A]'
              : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white'
          }`}
        >
          <Laptop className="w-3.5 h-3.5" />
          <span>System</span>
        </button>
      </div>
    </div>
  );
}

/**
 * Compact Icon Button Toggle (Sun / Moon) for headers with circular ripple effect
 */
export function ThemeToggleButton({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(next, e);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`p-2 rounded-xl text-[#64748B] dark:text-[#94A3B8] hover:text-[#5B4AE6] dark:hover:text-white hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] border border-transparent hover:border-[#E2E8F0] dark:hover:border-[#334155] transition-all cursor-pointer shadow-2xs ${
        className || ''
      }`}
      title={`Switch to ${resolvedTheme === 'dark' ? 'Light' : 'Dark'} mode`}
      aria-label="Toggle theme"
    >
      {resolvedTheme === 'dark' ? (
        <Sun className="w-4 h-4 text-amber-400" />
      ) : (
        <Moon className="w-4 h-4 text-[#5B4AE6]" />
      )}
    </button>
  );
}
