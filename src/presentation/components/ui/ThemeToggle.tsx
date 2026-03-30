import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      className="w-9 h-9 flex items-center justify-center rounded-lg text-text-secondary hover:bg-gray-100 dark:hover:bg-primary/10 hover:text-text-primary dark:hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
    >
      {isDark
        ? <Sun className="w-5 h-5" strokeWidth={1.5} />
        : <Moon className="w-5 h-5" strokeWidth={1.5} />
      }
    </button>
  );
}
