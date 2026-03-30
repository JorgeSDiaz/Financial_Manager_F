import { Pencil, Trash2, Tag } from 'lucide-react';
import { ICON_MAP } from './categoryConstants';
import type { Category } from '../../../domain/entities';

interface CategoryBadgeProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  className?: string;
}

export function CategoryBadge({ category, onEdit, onDelete, className = '' }: CategoryBadgeProps) {
  const Icon = ICON_MAP[category.icon] ?? Tag;

  return (
    <div
      className={`flex items-center justify-between gap-3 rounded-xl border border-[var(--color-card-border)] bg-white dark:bg-[var(--color-card)] px-4 py-3 transition-all duration-200 hover:shadow-sm ${category.isActive ? '' : 'opacity-50'} ${className}`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <span
          className="w-8 h-8 flex items-center justify-center rounded-xl flex-shrink-0"
          style={{ backgroundColor: `${category.color}20`, color: category.color }}
        >
          <Icon className="w-4 h-4" strokeWidth={1.5} />
        </span>
        <span className="text-sm font-medium text-text-primary truncate">{category.name}</span>
      </div>

      <div className="flex items-center gap-1 flex-shrink-0">
        <button
          onClick={() => onEdit(category)}
          className="p-1.5 rounded-lg text-text-secondary hover:text-primary hover:bg-primary/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
          title="Editar categoría"
        >
          <Pencil className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => onDelete(category)}
          className="p-1.5 rounded-lg text-text-secondary hover:text-danger hover:bg-danger/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger"
          title="Eliminar categoría"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
