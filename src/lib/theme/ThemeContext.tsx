'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme, event?: React.MouseEvent<HTMLElement> | MouseEvent) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'shikhopath-theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light');
  const [mounted, setMounted] = useState(false);

  // Determine system preference
  const getSystemTheme = useCallback((): ResolvedTheme => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }, []);

  // Update DOM classes
  const applyThemeToDOM = useCallback((targetTheme: ResolvedTheme) => {
    const root = document.documentElement;
    if (targetTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, []);

  // Initialize theme on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
      const initialTheme = saved === 'light' || saved === 'dark' || saved === 'system' ? saved : 'system';
      setThemeState(initialTheme);

      const resolved = initialTheme === 'system' ? getSystemTheme() : initialTheme;
      setResolvedTheme(resolved);
      applyThemeToDOM(resolved);
    } catch {
      // fallback
    }
    setMounted(true);
  }, [getSystemTheme, applyThemeToDOM]);

  // Listen to system preference changes when in 'system' mode
  useEffect(() => {
    if (!mounted || theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const resolved = mediaQuery.matches ? 'dark' : 'light';
      setResolvedTheme(resolved);
      applyThemeToDOM(resolved);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [mounted, theme, applyThemeToDOM]);

  // Circular reveal animation when switching theme
  const setTheme = useCallback(
    (newTheme: Theme, event?: React.MouseEvent<HTMLElement> | MouseEvent) => {
      const nextResolved = newTheme === 'system' ? getSystemTheme() : newTheme;

      try {
        localStorage.setItem(STORAGE_KEY, newTheme);
      } catch {
        // LocalStorage disabled or quota exceeded
      }

      // If resolved theme doesn't actually change, just update state
      if (nextResolved === resolvedTheme) {
        setThemeState(newTheme);
        return;
      }

      // Calculate origin coordinates for circular reveal
      let x = window.innerWidth / 2;
      let y = window.innerHeight / 2;

      if (event) {
        x = event.clientX;
        y = event.clientY;
      }

      // Maximum radius to reach the farthest corner of the viewport
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const executeThemeUpdate = () => {
        setThemeState(newTheme);
        setResolvedTheme(nextResolved);
        applyThemeToDOM(nextResolved);
      };

      // 1. Native View Transitions API support (Chromium, Edge, Safari 18+)
      const doc = document as any;
      if (typeof doc.startViewTransition === 'function') {
        try {
          const transition = doc.startViewTransition(() => {
            executeThemeUpdate();
          });

          transition.ready
            .then(() => {
              try {
                const clipPath = [
                  `circle(0px at ${x}px ${y}px)`,
                  `circle(${endRadius}px at ${x}px ${y}px)`,
                ];

                doc.documentElement.animate(
                  {
                    clipPath: clipPath,
                  },
                  {
                    duration: 550,
                    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                    pseudoElement: '::view-transition-new(root)',
                  }
                );
              } catch {
                // If pseudoElement animate is unsupported, transition proceeds naturally
              }
            })
            .catch(() => {
              executeThemeUpdate();
            });
          return;
        } catch {
          // If startViewTransition fails, fall through to fallback
        }
      }

      // 2. Smooth fallback circular ripple overlay for older browsers
      const overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.inset = '0';
      overlay.style.zIndex = '999999';
      overlay.style.pointerEvents = 'none';
      overlay.style.backgroundColor = nextResolved === 'dark' ? '#0B0F19' : '#F8FAFC';
      overlay.style.clipPath = `circle(0px at ${x}px ${y}px)`;
      overlay.style.transition = 'clip-path 550ms cubic-bezier(0.4, 0, 0.2, 1)';
      document.body.appendChild(overlay);

      requestAnimationFrame(() => {
        overlay.style.clipPath = `circle(${endRadius}px at ${x}px ${y}px)`;
      });

      setTimeout(() => {
        executeThemeUpdate();
        overlay.style.transition = 'opacity 200ms ease';
        overlay.style.opacity = '0';
        setTimeout(() => {
          if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        }, 220);
      }, 550);
    },
    [resolvedTheme, getSystemTheme, applyThemeToDOM]
  );

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
