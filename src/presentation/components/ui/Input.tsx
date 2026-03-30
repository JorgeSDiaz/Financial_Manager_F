import { InputHTMLAttributes } from 'react';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label: string;
  error?: string;
  className?: string;
}

const baseFieldClasses =
  'w-full px-3 py-2 rounded-lg border bg-white dark:bg-[var(--color-card)] text-text-primary text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent disabled:opacity-60 disabled:cursor-not-allowed';

export function Input({ label, error, className = '', ...rest }: InputProps) {
  const borderClass = error
    ? 'border-danger focus:ring-danger'
    : 'border-[var(--color-card-border)]';

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label className="text-sm font-medium text-text-primary">{label}</label>
      <input className={`${baseFieldClasses} ${borderClass}`} {...rest} />
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}
