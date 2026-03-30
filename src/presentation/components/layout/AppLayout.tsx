import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { useSidebar } from '../../hooks/useSidebar';

export function AppLayout() {
  const { isCollapsed, toggle } = useSidebar();

  return (
    <div className="flex min-h-screen bg-surface dark:bg-[var(--color-background)]">
      <Sidebar isCollapsed={isCollapsed} onToggle={toggle} />

      <button
        onClick={toggle}
        className={[
          'fixed top-3 left-3 z-50 md:hidden',
          'p-2 rounded-lg',
          'text-text-secondary hover:bg-gray-100 dark:hover:bg-primary/10',
          'transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600',
        ].join(' ')}
        aria-label="Toggle sidebar"
      >
        <Menu className="w-5 h-5" strokeWidth={1.5} />
      </button>

      <main
        className={[
          'flex-1 transition-all duration-200 ease-out',
          isCollapsed ? 'ml-16' : 'ml-[200px]',
        ].join(' ')}
      >
        <Outlet />
      </main>
    </div>
  );
}
