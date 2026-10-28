import { useCallback, useLayoutEffect, useState } from 'react';

const STORAGE_KEY = 'aq-theme';
const THEME_COLOR = { dark: '#06070d', light: '#f6f7fb' };

// index.html sets data-theme before first paint; this hook keeps React in step and persists changes.
export function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute('data-theme') || 'dark');

  // Layout effect: runs before children's effects, so the canvas reads the new colours.
  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme]);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* private mode: the choice just won't persist */
    }
  }, [theme]);

  const toggle = useCallback(() => setTheme((t) => (t === 'light' ? 'dark' : 'light')), []);
  return { theme, toggle };
}
