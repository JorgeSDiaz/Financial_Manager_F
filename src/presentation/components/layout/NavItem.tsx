import { type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

interface NavItemProps {
  to: string;
  icon: ReactNode;
  label: string;
  isCollapsed: boolean;
}

export function NavItem({ to, icon, label, isCollapsed }: NavItemProps) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      title={isCollapsed ? label : undefined}
      className={({ isActive }) =>
        [
          'flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ease-out',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2',
          isActive
            ? 'bg-primary/10 text-primary-700 dark:text-primary-300 font-medium'
            : 'text-text-secondary hover:bg-gray-50 dark:hover:bg-primary/5 hover:text-text-primary',
        ].join(' ')
      }
    >
      <span className="w-6 h-6 flex-shrink-0 flex items-center justify-center">{icon}</span>
      <span
        className={[
          'text-sm transition-all duration-200 overflow-hidden whitespace-nowrap',
          isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100',
        ].join(' ')}
      >
        {label}
      </span>
    </NavLink>
  );
}
