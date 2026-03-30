import { ReactNode } from 'react';

interface ActionCardProps {
  label: string;
  icon: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function ActionCard({ label, icon, onClick, className = '' }: ActionCardProps) {
  return (
    <button
      onClick={onClick}
      className={`col-span-6 md:col-span-4 lg:col-span-3 bg-primary/5 dark:bg-primary/15 border border-primary/20 dark:border-primary/30 rounded-2xl p-5 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-200 hover:bg-primary/10 dark:hover:bg-primary/25 hover:scale-[1.02] hover:shadow-md active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 w-full ${className}`}
    >
      <span className="w-10 h-10 flex items-center justify-center text-primary dark:text-primary-300">
        {icon}
      </span>
      <span className="text-sm font-medium text-primary dark:text-primary-300">{label}</span>
    </button>
  );
}
