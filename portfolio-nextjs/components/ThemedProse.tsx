'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { ReactNode } from 'react';

interface ThemedProseProps {
  children?: ReactNode;
  dangerouslySetInnerHTML?: { __html: string };
  className?: string;
}

export default function ThemedProse({ children, dangerouslySetInnerHTML, className = '' }: ThemedProseProps) {
  const { theme } = useTheme();

  // Generate dynamic styles based on theme
  const proseStyles = {
    color: theme.text.primary,
    '--tw-prose-body': theme.text.primary,
    '--tw-prose-headings': theme.text.primary,
    '--tw-prose-lead': theme.text.secondary,
    '--tw-prose-links': theme.text.primary,
    '--tw-prose-bold': theme.text.primary,
    '--tw-prose-counters': theme.text.tertiary,
    '--tw-prose-bullets': theme.text.tertiary,
    '--tw-prose-hr': theme.border,
    '--tw-prose-quotes': theme.text.primary,
    '--tw-prose-quote-borders': theme.border,
    '--tw-prose-captions': theme.text.tertiary,
    '--tw-prose-code': theme.text.primary,
    '--tw-prose-pre-code': theme.text.primary,
    '--tw-prose-pre-bg': theme.card,
    '--tw-prose-th-borders': theme.border,
    '--tw-prose-td-borders': theme.border,
  } as React.CSSProperties;

  return (
    <div
      className={`prose max-w-none prose-headings:font-bold prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-[''] prose-code:after:content-[''] ${className}`}
      style={proseStyles}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
    >
      {children}
    </div>
  );
}
