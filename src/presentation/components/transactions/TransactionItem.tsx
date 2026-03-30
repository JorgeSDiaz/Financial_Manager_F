import { Pencil, Trash2, Tag, TrendingUp, TrendingDown } from 'lucide-react';
import { ICON_MAP } from '../categories/categoryConstants';
import { formatCurrency, formatShortDate } from '../../utils/formatters';
import type { Transaction } from '../../../domain/entities';

interface TransactionItemProps {
  transaction: Transaction;
  accountName: string;
  categoryName: string;
  categoryColor: string;
  categoryIcon: string;
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
  className?: string;
}

export function TransactionItem({
  transaction,
  accountName,
  categoryName,
  categoryColor,
  categoryIcon,
  onEdit,
  onDelete,
  className = '',
}: TransactionItemProps) {
  const CategoryIcon = ICON_MAP[categoryIcon] ?? Tag;
  const isIncome = transaction.type === 'income';
  const TypeIcon = isIncome ? TrendingUp : TrendingDown;
  const amountColor = isIncome ? 'text-emerald-600 dark:text-emerald-400' : 'text-danger';
  const amountPrefix = isIncome ? '+' : '-';

  return (
    <div
      className={`flex items-center justify-between gap-3 rounded-xl border border-[var(--color-card-border)] bg-white dark:bg-[var(--color-card)] px-4 py-3 transition-all duration-200 hover:shadow-sm ${className}`}
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {/* Category icon */}
        <span
          className="w-9 h-9 flex items-center justify-center rounded-xl flex-shrink-0"
          style={{ backgroundColor: `${categoryColor}20`, color: categoryColor }}
        >
          <CategoryIcon className="w-4 h-4" strokeWidth={1.5} />
        </span>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-text-primary truncate">
              {transaction.description || categoryName}
            </span>
            <span
              className={`inline-flex items-center gap-0.5 text-xs px-1.5 py-0.5 rounded-md flex-shrink-0 ${
                isIncome
                  ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400'
                  : 'bg-danger/10 text-danger'
              }`}
            >
              <TypeIcon className="w-3 h-3" strokeWidth={2} />
              {isIncome ? 'Ingreso' : 'Gasto'}
            </span>
          </div>
          <p className="text-xs text-text-secondary mt-0.5 truncate">
            {formatShortDate(transaction.date)} · {accountName} · {categoryName}
          </p>
        </div>
      </div>

      {/* Amount + actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className={`text-sm font-semibold tabular-nums ${amountColor}`}>
          {amountPrefix}{formatCurrency(transaction.amount)}
        </span>
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => onEdit(transaction)}
            className="p-1.5 rounded-lg text-text-secondary hover:text-primary hover:bg-primary/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
            title="Editar transacción"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDelete(transaction)}
            className="p-1.5 rounded-lg text-text-secondary hover:text-danger hover:bg-danger/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger"
            title="Eliminar transacción"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
