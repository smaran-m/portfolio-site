'use client';

import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';

interface TagProps {
  name: string;
  href?: string;
  active?: boolean;
}

export default function Tag({ name, href, active = false }: TagProps) {
  const { theme } = useTheme();

  const style = active
    ? undefined // Let the Tailwind classes handle active state
    : {
        color: theme.text.secondary,
        borderColor: theme.border,
      };

  const className = `inline-block px-3 py-1 text-xs font-mono border transition-colors ${
    active
      ? 'bg-accent text-white border-accent'
      : 'bg-transparent hover:border-accent hover:text-accent'
  }`;

  if (href) {
    return (
      <Link href={href} className={className} style={style}>
        {name}
      </Link>
    );
  }

  return <span className={className} style={style}>{name}</span>;
}
