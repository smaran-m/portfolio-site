import Link from 'next/link';

interface TagProps {
  name: string;
  href?: string;
  active?: boolean;
}

export default function Tag({ name, href, active = false }: TagProps) {
  const className = `inline-block px-3 py-1 text-xs font-mono border transition-colors ${
    active
      ? 'bg-accent text-white border-accent'
      : 'bg-transparent text-gray-700 border-gray-300 hover:border-accent hover:text-accent'
  }`;

  if (href) {
    return (
      <Link href={href} className={className}>
        {name}
      </Link>
    );
  }

  return <span className={className}>{name}</span>;
}
