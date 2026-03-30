import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatCurrency, formatShortDate } from '../../utils/formatters';

interface Transaction {
  description: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
}

interface RecentTransactionsListProps {
  transactions: Transaction[];
  className?: string;
}


export function RecentTransactionsList({ transactions, className = '' }: RecentTransactionsListProps) {
  return (
    <div
      className={`col-span-4 md:col-span-6 lg:col-span-6 row-span-2 bg-white dark:bg-[var(--color-card)] border border-[var(--color-card-border)] rounded-2xl shadow-sm overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-card-border)]">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-text-primary">Transacciones Recientes</h2>
          <span className="bg-primary/10 text-primary dark:text-primary-300 text-xs font-medium rounded-full px-2 py-0.5">
            {transactions.length}
          </span>
        </div>
        <button className="text-xs font-medium text-primary dark:text-primary-300 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded">
          Ver todo
        </button>
      </div>

      {/* List */}
      <div className="overflow-y-auto max-h-[320px] divide-y divide-gray-100 dark:divide-primary/10">
        {transactions.map((tx, i) => {
          const isIncome = tx.type === 'income';
          const Icon = isIncome ? ArrowUpRight : ArrowDownRight;
          return (
            <div
              key={i}
              className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 dark:hover:bg-primary/5 transition-colors duration-150"
            >
              <span className={`w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0 ${isIncome ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                <Icon className="w-4 h-4" strokeWidth={1.5} />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">{tx.description}</p>
                <p className="text-xs text-text-secondary">{formatShortDate(tx.date)}</p>
              </div>
              <p className={`text-sm font-semibold tabular-nums flex-shrink-0 ${isIncome ? 'text-success' : 'text-danger'}`}>
                {isIncome ? '+' : '-'}{formatCurrency(tx.amount)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
