interface CategoryExpense {
  name: string;
  total: number;
  percentage: number;
}

interface ExpensesByCategoryChartProps {
  categories: CategoryExpense[];
  className?: string;
}

import { formatCurrency } from '../../utils/formatters';

const CATEGORY_COLORS = [
  'bg-primary-500',
  'bg-primary-400',
  'bg-primary-300',
  'bg-primary-600',
  'bg-primary-200',
];

export function ExpensesByCategoryChart({ categories, className = '' }: ExpensesByCategoryChartProps) {
  return (
    <div
      className={`col-span-4 md:col-span-6 lg:col-span-6 row-span-2 bg-white dark:bg-[var(--color-card)] border border-[var(--color-card-border)] rounded-2xl shadow-sm overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-card-border)]">
        <h2 className="text-sm font-semibold text-text-primary">Gastos por Categoría</h2>
        <span className="text-xs text-text-secondary">Este mes</span>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-4">
        {/* Stacked bar */}
        <div className="flex h-3 rounded-full overflow-hidden gap-0.5">
          {categories.map((cat, i) => (
            <div
              key={cat.name}
              className={`${CATEGORY_COLORS[i % CATEGORY_COLORS.length]} transition-all duration-500`}
              style={{ width: `${cat.percentage}%` }}
            />
          ))}
        </div>

        {/* Legend + bars */}
        <div className="flex flex-col gap-3 mt-2">
          {categories.map((cat, i) => (
            <div key={cat.name} className="flex items-center gap-3">
              <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${CATEGORY_COLORS[i % CATEGORY_COLORS.length]}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-text-primary truncate">{cat.name}</span>
                  <span className="text-sm font-semibold tabular-nums text-text-primary ml-2">{formatCurrency(cat.total)}</span>
                </div>
                <div className="h-1.5 bg-gray-100 dark:bg-primary/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${CATEGORY_COLORS[i % CATEGORY_COLORS.length]} rounded-full transition-all duration-500`}
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
              <span className="text-xs text-text-secondary w-8 text-right flex-shrink-0">{cat.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
