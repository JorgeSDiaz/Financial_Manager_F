import type {
  ApiAccount,
  ApiCategory,
  ApiTransaction,
  ApiDashboardResponse,
  ApiSummaryResponse,
} from './types';
import type {
  Account,
  Category,
  Transaction,
  DashboardSummary,
} from '../../domain/entities';

export function mapAccount(raw: ApiAccount): Account {
  return {
    id: raw.id,
    name: raw.name,
    type: raw.type,
    initialBalance: raw.initial_balance,
    currentBalance: raw.current_balance,
    currency: raw.currency,
    color: raw.color,
    icon: raw.icon,
    isActive: raw.is_active,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
  };
}

export function mapCategory(raw: ApiCategory): Category {
  return {
    id: raw.id,
    name: raw.name,
    type: raw.type,
    color: raw.color,
    icon: raw.icon,
    isSystem: raw.is_system,
    isActive: raw.is_active,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
  };
}

export function mapTransaction(raw: ApiTransaction): Transaction {
  return {
    id: raw.id,
    type: raw.type,
    accountId: raw.account_id,
    categoryId: raw.category_id,
    amount: raw.amount,
    description: raw.description,
    date: raw.date,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
  };
}

export function mapDashboard(raw: ApiDashboardResponse): DashboardSummary {
  return {
    globalBalance: raw.global_balance,
    monthlySummary: {
      totalIncome: raw.monthly_summary.total_income,
      totalExpense: raw.monthly_summary.total_expense,
      netBalance: raw.monthly_summary.net_balance,
    },
    expensesByCategory: raw.expenses_by_category.map((item) => ({
      categoryId: item.category_id,
      categoryName: item.category_name,
      total: item.total,
    })),
    recentTransactions: raw.recent_transactions.map(mapTransaction),
  };
}

export function mapSummary(raw: ApiSummaryResponse) {
  return {
    totalIncome: raw.total_income,
    totalExpense: raw.total_expense,
    balance: raw.balance,
  };
}
