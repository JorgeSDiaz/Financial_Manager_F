import { ReactNode } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  icon: ReactNode;
  trend?: number;
  trendDirection?: 'up' | 'down' | 'neutral';
  valueColor?: string;
  className?: string;
}

export function StatCard({
  label,
  value,
  icon,
  trend,
  trendDirection = 'neutral',
  valueColor = 'text-text-primary',
  className = '',
}: StatCardProps) {
  const trendIconMap = { up: TrendingUp, down: TrendingDown, neutral: Minus };
  const trendColorMap = { up: 'text-success', down: 'text-danger', neutral: 'text-text-secondary' };
  const TrendIcon = trendIconMap[trendDirection];
  const trendColor = trendColorMap[trendDirection];

  return (
    <div
      className={`col-span-6 md:col-span-4 lg:col-span-3 bg-white dark:bg-[var(--color-card)] border border-[var(--color-card-border)] rounded-2xl shadow-sm p-5 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 overflow-hidden ${className}`}
    >
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-text-secondary">{label}</p>
        <span className="w-8 h-8 flex items-center justify-center rounded-xl bg-primary/10 text-primary dark:text-primary-300">
          {icon}
        </span>
      </div>
      <p className={`text-3xl font-bold tabular-nums tracking-tight ${valueColor}`}>{value}</p>
      {trend !== undefined && (
        <div className={`mt-2 flex items-center gap-1 ${trendColor}`}>
          <TrendIcon className="w-4 h-4" strokeWidth={1.5} />
          <span className="text-xs font-medium">{Math.abs(trend)}% vs mes ant.</span>
        </div>
      )}
    </div>
  );
}
