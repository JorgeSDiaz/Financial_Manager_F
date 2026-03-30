import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  children: ReactNode;
}

export function Button({ 
  variant = 'primary', 
  children, 
  className = '',
  ...props 
}: ButtonProps) {
  const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2';

  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-600',
    secondary: 'bg-gray-200 text-text-primary hover:bg-gray-300 dark:hover:bg-primary/10',
    danger: 'bg-danger text-white hover:bg-red-600',
  };

  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
