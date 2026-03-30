import type { LucideIcon } from 'lucide-react';
import {
  LayoutDashboard,
  ArrowLeftRight,
  Landmark,
  Tags,
  Download,
  PanelLeftClose,
  PanelLeftOpen,
  Wallet,
} from 'lucide-react';
import { NavItem } from './NavItem';
import { ThemeToggle } from '../ui';

const ROUTES: { to: string; Icon: LucideIcon; label: string }[] = [
  { to: '/', Icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/transactions', Icon: ArrowLeftRight, label: 'Transacciones' },
  { to: '/accounts', Icon: Landmark, label: 'Cuentas' },
  { to: '/categories', Icon: Tags, label: 'Categorías' },
  { to: '/export', Icon: Download, label: 'Exportar' },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  return (
    <aside
      className={[
        'fixed left-0 top-0 h-screen z-40 flex flex-col py-4 px-2',
        'bg-white dark:bg-[var(--color-card)]',
        'border-r border-[var(--color-card-border)]',
        'transition-all duration-200 ease-out',
        isCollapsed ? 'w-16' : 'w-[200px]',
      ].join(' ')}
    >
      <div className="flex items-center justify-center px-3 mb-4 h-9 flex-shrink-0">
        <Wallet className="w-6 h-6 text-primary" strokeWidth={1.5} />
      </div>

      <nav className="flex flex-col gap-1 flex-1 overflow-y-auto">
        {ROUTES.map(({ to, Icon, label }) => (
          <NavItem
            key={to}
            to={to}
            icon={<Icon className="w-6 h-6" strokeWidth={1.5} />}
            label={label}
            isCollapsed={isCollapsed}
          />
        ))}
      </nav>

      <div
        className={[
          'flex pt-3 gap-1 border-t border-[var(--color-card-border)] flex-shrink-0',
          isCollapsed ? 'flex-col items-center' : 'flex-row items-center justify-between',
        ].join(' ')}
      >
        <ThemeToggle />
        <button
          onClick={onToggle}
          title={isCollapsed ? 'Expandir' : 'Colapsar'}
          className={[
            'w-9 h-9 flex items-center justify-center rounded-lg flex-shrink-0',
            'text-text-secondary hover:bg-gray-100 dark:hover:bg-primary/10 hover:text-text-primary',
            'transition-all duration-200 ease-out',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2',
          ].join(' ')}
        >
          {isCollapsed
            ? <PanelLeftOpen className="w-5 h-5" strokeWidth={1.5} />
            : <PanelLeftClose className="w-5 h-5" strokeWidth={1.5} />
          }
        </button>
      </div>
    </aside>
  );
}
