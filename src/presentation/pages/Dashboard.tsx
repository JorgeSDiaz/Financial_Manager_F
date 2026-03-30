import { TrendingUp, TrendingDown, Wallet, Plus } from 'lucide-react';
import {
  SummaryCard,
  StatCard,
  ActionCard,
  RecentTransactionsList,
  ExpensesByCategoryChart,
  AccountsList,
} from '../components/dashboard';
import { formatCurrency } from '../utils/formatters';

const mockData = {
  totalBalance: 12430.0,
  totalIncome: 4320.0,
  totalExpense: 2150.75,
  monthlyNet: 2169.25,
  recentTransactions: [
    { description: 'Salario', amount: 3500, type: 'income' as const, date: '2026-03-28' },
    { description: 'Supermercado', amount: 85.5, type: 'expense' as const, date: '2026-03-27' },
    { description: 'Netflix', amount: 15.99, type: 'expense' as const, date: '2026-03-26' },
    { description: 'Freelance', amount: 820, type: 'income' as const, date: '2026-03-25' },
    { description: 'Gasolina', amount: 45.0, type: 'expense' as const, date: '2026-03-24' },
  ],
  expensesByCategory: [
    { name: 'Alimentación', total: 450, percentage: 35 },
    { name: 'Transporte', total: 280, percentage: 22 },
    { name: 'Entretenimiento', total: 200, percentage: 16 },
    { name: 'Servicios', total: 180, percentage: 14 },
    { name: 'Otros', total: 165, percentage: 13 },
  ],
  accounts: [
    { name: 'Efectivo', type: 'cash' as const, balance: 1230.0 },
    { name: 'Banco Principal', type: 'bank' as const, balance: 8500.0 },
    { name: 'Tarjeta Crédito', type: 'card' as const, balance: -1300.0 },
    { name: 'Ahorros', type: 'savings' as const, balance: 4000.0 },
  ],
};


export function Dashboard() {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-text-primary mb-6">Dashboard</h1>

        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4 auto-rows-[minmax(80px,auto)]">

          <SummaryCard
            totalBalance={mockData.totalBalance}
            className="animate-fade-in-up [animation-delay:0ms]"
          />

          <StatCard
            label="Ingresos del Mes"
            value={formatCurrency(mockData.totalIncome)}
            icon={<TrendingUp className="w-4 h-4" strokeWidth={1.5} />}
            trend={12}
            trendDirection="up"
            valueColor="text-success"
            className="animate-fade-in-up [animation-delay:75ms]"
          />

          <StatCard
            label="Gastos del Mes"
            value={formatCurrency(mockData.totalExpense)}
            icon={<TrendingDown className="w-4 h-4" strokeWidth={1.5} />}
            trend={5}
            trendDirection="down"
            valueColor="text-danger"
            className="animate-fade-in-up [animation-delay:150ms]"
          />

          <StatCard
            label="Neto del Mes"
            value={formatCurrency(mockData.monthlyNet)}
            icon={<Wallet className="w-4 h-4" strokeWidth={1.5} />}
            trend={8}
            trendDirection="up"
            valueColor="text-text-primary"
            className="animate-fade-in-up [animation-delay:225ms]"
          />

          <ActionCard
            label="Agregar Ingreso"
            icon={<Plus className="w-8 h-8" strokeWidth={1.5} />}
            className="animate-fade-in-up [animation-delay:300ms]"
          />

          <RecentTransactionsList
            transactions={mockData.recentTransactions}
            className="animate-fade-in-up [animation-delay:375ms]"
          />

          <ExpensesByCategoryChart
            categories={mockData.expensesByCategory}
            className="animate-fade-in-up [animation-delay:450ms]"
          />

          <AccountsList
            accounts={mockData.accounts}
            className="animate-fade-in-up [animation-delay:525ms]"
          />

        </div>
      </div>
    </div>
  );
}
