import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'hero' | 'action';
  hover?: boolean;
}

export function Card({ children, className = '', variant = 'default', hover = true }: CardProps) {
  const base = 'rounded-2xl overflow-hidden transition-all duration-200';

  const variants = {
    default: 'bg-white dark:bg-[var(--color-card)] border border-[var(--color-card-border)] shadow-sm p-5',
    hero: 'bg-gradient-to-br from-primary-800 to-primary-700 shadow-xl p-6',
    action: 'bg-primary/5 border border-primary/20 p-5 cursor-pointer',
  };

  const hoverMap: Record<typeof variant, string> = {
    default: 'hover:shadow-md hover:-translate-y-0.5',
    action: 'hover:bg-primary/10 hover:scale-[1.02] hover:shadow-md',
    hero: '',
  };
  const hoverClasses = hover ? hoverMap[variant] : '';

  return (
    <div className={`${base} ${variants[variant]} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
}
