import { Pencil, Trash2 } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { ICON_MAP, ACCOUNT_TYPE_ICONS, ACCOUNT_TYPE_LABELS } from './accountConstants';
import type { Account } from '../../../domain/entities';

interface AccountCardProps {
  account: Account;
  onEdit: (account: Account) => void;
  onDelete: (account: Account) => void;
  className?: string;
}

export function AccountCard({ account, onEdit, onDelete, className = '' }: AccountCardProps) {
  const Icon = ICON_MAP[account.icon] ?? ACCOUNT_TYPE_ICONS[account.type];
  const isNegative = account.currentBalance < 0;

  return (
    <div
      className={`flex flex-col gap-3 rounded-2xl overflow-hidden border border-l-4 border-[var(--color-card-border)] bg-white dark:bg-[var(--color-card)] shadow-sm p-5 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${account.isActive ? '' : 'opacity-50'} ${className}`}
      style={{ borderLeftColor: account.color }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="w-8 h-8 flex items-center justify-center rounded-xl flex-shrink-0"
            style={{ backgroundColor: `${account.color}20`, color: account.color }}
          >
            <Icon className="w-4 h-4" strokeWidth={1.5} />
          </span>
          <span className="text-xs font-medium text-text-secondary bg-gray-100 dark:bg-primary/10 rounded-full px-2 py-0.5">
            {ACCOUNT_TYPE_LABELS[account.type]}
          </span>
        </div>
        {!account.isActive && (
          <span className="text-xs font-medium bg-warning/10 text-warning rounded-full px-2 py-0.5">Inactiva</span>
        )}
      </div>

      <p className="text-sm font-medium text-text-primary truncate">{account.name}</p>

      <p className={`text-xl font-bold tabular-nums tracking-tight ${isNegative ? 'text-danger' : 'text-text-primary'}`}>
        {formatCurrency(account.currentBalance)}
      </p>

      <div className="flex items-center justify-end gap-1 pt-1 border-t border-[var(--color-card-border)]">
        <button
          onClick={() => onEdit(account)}
          className="p-1.5 rounded-lg text-text-secondary hover:text-primary hover:bg-primary/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
          title="Editar cuenta"
        >
          <Pencil className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => onDelete(account)}
          className="p-1.5 rounded-lg text-text-secondary hover:text-danger hover:bg-danger/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger"
          title="Eliminar cuenta"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
