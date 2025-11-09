'use client';

import { ReactNode } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = false }: CardProps) {
  const { theme } = useTheme();

  return (
    <div
      className={`border p-6 ${
        hover ? 'transition-all hover:border-accent hover:shadow-lg' : ''
      } ${className}`}
      style={{
        borderColor: theme.border,
        backgroundColor: theme.card,
      }}
    >
      {children}
    </div>
  );
}
