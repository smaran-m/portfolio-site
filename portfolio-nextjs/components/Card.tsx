import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={`border border-gray-200 bg-white p-6 ${
        hover ? 'transition-all hover:border-accent hover:shadow-lg' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
