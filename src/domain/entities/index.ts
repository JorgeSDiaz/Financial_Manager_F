export interface Account {
  id: string;
  name: string;
  type: 'cash' | 'bank' | 'card' | 'savings';
  initialBalance: number;
  color: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  color: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  accountId: string;
  categoryId: string;
  amount: number;
  description: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardSummary {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
  monthlyNet: number;
  accounts: Account[];
  recentTransactions: Transaction[];
  expensesByCategory: { categoryId: string; categoryName: string; total: number }[];
}
