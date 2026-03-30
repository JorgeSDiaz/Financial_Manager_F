import { TrendingUp, TrendingDown, Wallet, Plus } from 'lucide-react';
import {
  SummaryCard,
  StatCard,
  ActionCard,
  RecentTransactionsList,
  ExpensesByCategoryChart,
  AccountsList,
  DashboardSkeleton,
  DashboardError,
} from '../components/dashboard';
import { formatCurrency } from '../utils/formatters';
import { useDashboard } from '../../application/hooks/useDashboard';
import { useAccounts } from '../../application/hooks/useAccounts';

export function Dashboard() {
  const dashboard = useDashboard();
  const accounts = useAccounts();

  const isLoading = dashboard.isLoading || accounts.isLoading;
  const isError = dashboard.isError || accounts.isError;

  function handleRetry() {
    dashboard.refetch();
    accounts.refetch();
  }

  const total = dashboard.data?.expensesByCategory.reduce((sum, c) => sum + c.total, 0) ?? 0;
  const categoryData = dashboard.data?.expensesByCategory.map(c => ({
    name: c.categoryName,
    total: c.total,
    percentage: total > 0 ? Math.round((c.total / total) * 100) : 0,
  })) ?? [];

  const accountsData = accounts.data?.accounts.map(a => ({ name: a.name, type: a.type, balance: a.currentBalance })) ?? [];

  return (
    <div className="p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-text-primary mb-4">Dashboard</h1>

        {isLoading && <DashboardSkeleton />}

        {isError && <DashboardError onRetry={handleRetry} isRetrying={dashboard.isFetching || accounts.isFetching} />}

        {!isLoading && !isError && dashboard.data && (
          <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-3 auto-rows-[minmax(80px,auto)]">

            <SummaryCard
              totalBalance={dashboard.data.globalBalance}
              className="animate-fade-in-up [animation-delay:0ms]"
            />

            <StatCard
              label="Ingresos del Mes"
              value={formatCurrency(dashboard.data.monthlySummary.totalIncome)}
              icon={<TrendingUp className="w-4 h-4" strokeWidth={1.5} />}
              valueColor="text-success"
              className="animate-fade-in-up [animation-delay:75ms]"
            />

            <StatCard
              label="Gastos del Mes"
              value={formatCurrency(dashboard.data.monthlySummary.totalExpense)}
              icon={<TrendingDown className="w-4 h-4" strokeWidth={1.5} />}
              valueColor="text-danger"
              className="animate-fade-in-up [animation-delay:150ms]"
            />

            <StatCard
              label="Neto del Mes"
              value={formatCurrency(dashboard.data.monthlySummary.netBalance)}
              icon={<Wallet className="w-4 h-4" strokeWidth={1.5} />}
              className="animate-fade-in-up [animation-delay:225ms]"
            />

            <ActionCard
              label="Agregar Ingreso"
              icon={<Plus className="w-8 h-8" strokeWidth={1.5} />}
              className="animate-fade-in-up [animation-delay:300ms]"
            />

            <RecentTransactionsList
              transactions={dashboard.data.recentTransactions}
              className="animate-fade-in-up [animation-delay:375ms]"
            />

            <ExpensesByCategoryChart
              categories={categoryData}
              className="animate-fade-in-up [animation-delay:450ms]"
            />

            <AccountsList
              accounts={accountsData}
              className="animate-fade-in-up [animation-delay:525ms]"
            />

          </div>
        )}
      </div>
    </div>
  );
}
