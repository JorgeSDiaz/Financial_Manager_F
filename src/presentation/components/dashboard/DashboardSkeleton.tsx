import { Skeleton } from '../ui/Skeleton';

export function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4 auto-rows-[minmax(80px,auto)]">
      {/* Hero / SummaryCard */}
      <Skeleton className="col-span-4 md:col-span-6 lg:col-span-6 row-span-2" />

      {/* StatCard x3 */}
      <Skeleton className="col-span-6 md:col-span-4 lg:col-span-3" />
      <Skeleton className="col-span-6 md:col-span-4 lg:col-span-3" />
      <Skeleton className="col-span-6 md:col-span-4 lg:col-span-3" />

      {/* ActionCard */}
      <Skeleton className="col-span-4 md:col-span-4 lg:col-span-3" />

      {/* RecentTransactionsList */}
      <Skeleton className="col-span-4 md:col-span-6 lg:col-span-6 row-span-2" />

      {/* ExpensesByCategoryChart */}
      <Skeleton className="col-span-4 md:col-span-6 lg:col-span-6 row-span-2" />

      {/* AccountsList */}
      <Skeleton className="col-span-4 md:col-span-8 lg:col-span-12" />
    </div>
  );
}
