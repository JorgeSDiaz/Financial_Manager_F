export interface Account {
  id: string;
  name: string;
  type: 'cash' | 'bank' | 'card' | 'savings';
  initialBalance: number;
  currentBalance: number;
  currency: string;
  color: string;
  icon: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  color: string;
  icon: string;
  isSystem: boolean;
  isActive: boolean;
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
  globalBalance: number;
  monthlySummary: {
    totalIncome: number;
    totalExpense: number;
    netBalance: number;
  };
  expensesByCategory: {
    categoryId: string;
    categoryName: string;
    total: number;
  }[];
  recentTransactions: Transaction[];
}

// Request payloads — snake_case to match backend expectations directly
export interface CreateAccountPayload {
  name: string;
  type: Account['type'];
  initial_balance: number;
  currency?: string;
  color: string;
  icon: string;
}

export interface UpdateAccountPayload {
  name?: string;
  type?: Account['type'];
  currency?: string;
  color?: string;
  icon?: string;
}

export interface CreateCategoryPayload {
  name: string;
  type: Category['type'];
  color: string;
  icon: string;
}

export interface UpdateCategoryPayload {
  name?: string;
  type?: Category['type'];
  color?: string;
  icon?: string;
}

export interface CreateTransactionPayload {
  type: Transaction['type'];
  account_id: string;
  category_id: string;
  amount: number;
  description: string;
  date: string;
}
