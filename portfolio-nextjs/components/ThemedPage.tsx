'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { ReactNode } from 'react';

interface ThemedPageProps {
  children: ReactNode;
  className?: string;
}

export default function ThemedPage({ children, className = '' }: ThemedPageProps) {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen ${className}`}
      style={{ backgroundColor: theme.background, color: theme.text.primary }}
    >
      {children}
    </div>
  );
}

export function ThemedText({ children, variant = 'primary', className = '' }: { children: ReactNode; variant?: 'primary' | 'secondary' | 'tertiary'; className?: string }) {
  const { theme } = useTheme();

  return (
    <span className={className} style={{ color: theme.text[variant] }}>
      {children}
    </span>
  );
}

export function ThemedBorder({ children, className = '' }: { children: ReactNode; className?: string }) {
  const { theme } = useTheme();

  return (
    <div className={className} style={{ borderColor: theme.border }}>
      {children}
    </div>
  );
}
