import { Wallet, Building2, CreditCard, PiggyBank } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

interface Account {
  name: string;
  type: 'cash' | 'bank' | 'card' | 'savings';
  balance: number;
}

interface AccountsListProps {
  accounts: Account[];
  className?: string;
}

const ACCOUNT_ICONS = {
  cash: Wallet,
  bank: Building2,
  card: CreditCard,
  savings: PiggyBank,
};

const ACCOUNT_LABELS = {
  cash: 'Efectivo',
  bank: 'Banco',
  card: 'Tarjeta',
  savings: 'Ahorros',
};


export function AccountsList({ accounts, className = '' }: AccountsListProps) {
  return (
    <div
      className={`col-span-4 md:col-span-8 lg:col-span-12 bg-white dark:bg-[var(--color-card)] border border-[var(--color-card-border)] rounded-2xl shadow-sm overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-card-border)]">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-text-primary">Cuentas</h2>
          <span className="bg-primary/10 text-primary dark:text-primary-300 text-xs font-medium rounded-full px-2 py-0.5">
            {accounts.length}
          </span>
        </div>
        <button className="text-xs font-medium text-primary dark:text-primary-300 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded">
          Ver todas
        </button>
      </div>

      {/* Accounts grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--color-card-border)]">
        {accounts.map((account) => {
          const Icon = ACCOUNT_ICONS[account.type];
          const isNegative = account.balance < 0;
          return (
            <div
              key={account.name}
              className="bg-white dark:bg-[var(--color-card)] px-5 py-4 hover:bg-gray-50 dark:hover:bg-primary/5 transition-colors duration-150"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-8 flex items-center justify-center rounded-xl bg-primary/10 text-primary dark:text-primary-300 flex-shrink-0">
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                </span>
                <span className="text-xs font-medium text-text-secondary bg-gray-100 dark:bg-primary/10 rounded-full px-2 py-0.5">
                  {ACCOUNT_LABELS[account.type]}
                </span>
              </div>
              <p className="text-sm font-medium text-text-primary mb-1 truncate">{account.name}</p>
              <p className={`text-xl font-bold tabular-nums tracking-tight ${isNegative ? 'text-danger' : 'text-text-primary'}`}>
                {formatCurrency(account.balance)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
