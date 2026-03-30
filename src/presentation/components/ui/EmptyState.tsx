import type { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function EmptyState({ icon: Icon, title, description, className = '' }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-10 gap-3 text-center px-5 ${className}`}>
      <div className="w-12 h-12 rounded-2xl bg-primary/5 dark:bg-primary/10 flex items-center justify-center">
        <Icon className="w-6 h-6 text-text-muted" strokeWidth={1.5} />
      </div>
      <p className="text-sm font-medium text-text-secondary">{title}</p>
      <p className="text-xs text-text-muted">{description}</p>
    </div>
  );
}
