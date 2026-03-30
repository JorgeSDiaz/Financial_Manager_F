// Raw backend response shapes — snake_case, mirrors API JSON exactly.
// Only used within the infrastructure layer; never exposed to domain or presentation.

export interface ApiAccount {
  id: string;
  name: string;
  type: 'cash' | 'bank' | 'card' | 'savings';
  initial_balance: number;
  current_balance: number;
  currency: string;
  color: string;
  icon: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ApiCategory {
  id: string;
  name: string;
  type: 'income' | 'expense';
  color: string;
  icon: string;
  is_system: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ApiTransaction {
  id: string;
  type: 'income' | 'expense';
  account_id: string;
  category_id: string;
  amount: number;
  description: string;
  date: string;
  created_at: string;
  updated_at: string;
}

export interface ApiDashboardResponse {
  global_balance: number;
  monthly_summary: {
    total_income: number;
    total_expense: number;
    net_balance: number;
  };
  expenses_by_category: {
    category_id: string;
    category_name: string;
    total: number;
  }[];
  recent_transactions: ApiTransaction[];
}

export interface ApiAccountsResponse {
  accounts: ApiAccount[];
  global_balance: number;
}

export interface ApiTransactionsResponse {
  transactions: ApiTransaction[];
}

export interface ApiSummaryResponse {
  total_income: number;
  total_expense: number;
  balance: number;
}
