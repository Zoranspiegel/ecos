'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext<{
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}>({ theme: 'dark', toggleTheme: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme && (storedTheme === 'dark' || storedTheme === 'light')) {
      setTheme(storedTheme);
      document.documentElement.classList.add(storedTheme);
    } else if (matchMedia('(prefers-color-scheme: light)').media) {
      setTheme('light');
      document.documentElement.classList.add('light');
    }
  }, []);

  function toggleTheme() {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
