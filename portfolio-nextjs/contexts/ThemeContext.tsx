'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { THEMES, Theme } from '@/lib/colors';

type ThemeMode = 'light' | 'dark' | 'manila' | 'finder';

interface ThemeContextType {
  theme: Theme;
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load theme from localStorage
    const savedMode = localStorage.getItem('theme') as ThemeMode | null;
    if (savedMode && (savedMode === 'light' || savedMode === 'dark' || savedMode === 'manila' || savedMode === 'finder')) {
      setMode(savedMode);
    }
  }, []);

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : mode === 'dark' ? 'manila' : mode === 'manila' ? 'finder' : 'light';
    setMode(newMode);
    localStorage.setItem('theme', newMode);
  };

  return (
    <ThemeContext.Provider value={{ theme: THEMES[mode], mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
