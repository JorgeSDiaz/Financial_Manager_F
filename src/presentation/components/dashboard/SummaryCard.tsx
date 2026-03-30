import { formatCurrency, formatToday } from '../../utils/formatters';

interface SummaryCardProps {
  totalBalance: number;
  className?: string;
}

export function SummaryCard({ totalBalance, className = '' }: SummaryCardProps) {
  return (
    <div
      className={`col-span-4 md:col-span-6 lg:col-span-6 row-span-2 bg-gradient-to-br from-primary-800 to-primary-700 rounded-2xl p-6 shadow-xl overflow-hidden relative ${className}`}
    >
      <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/5" />
      <div className="absolute -bottom-12 -right-4 w-56 h-56 rounded-full bg-white/5" />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <p className="text-sm font-medium text-white/70">Balance Total</p>
          <p className="mt-2 text-4xl font-bold tabular-nums tracking-tight text-white">
            {formatCurrency(totalBalance)}
          </p>
          <p className="mt-1 text-xs text-white/50">Actualizado {formatToday()}</p>
        </div>

        <div className="mt-6 flex items-center gap-2">
          <span className="text-xs font-medium text-white/60 bg-white/10 rounded-full px-3 py-1">
            Todas las cuentas
          </span>
        </div>
      </div>
    </div>
  );
}
