import { describe, it, expect } from 'vitest';
import { mapAccount, mapCategory, mapTransaction, mapDashboard, mapSummary } from './mappers';
import type {
  ApiAccount,
  ApiCategory,
  ApiTransaction,
  ApiDashboardResponse,
  ApiSummaryResponse,
} from './types';

const rawAccount: ApiAccount = {
  id: 'acc-01',
  name: 'Banco Principal',
  type: 'bank',
  initial_balance: 1000,
  current_balance: 1500,
  currency: 'MXN',
  color: '#3357FF',
  icon: 'account_balance',
  is_active: true,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-06-01T00:00:00Z',
};

const rawCategory: ApiCategory = {
  id: 'cat-expense-01',
  name: 'Alimentación',
  type: 'expense',
  color: '#FF5733',
  icon: 'restaurant',
  is_system: true,
  is_active: true,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
};

const rawTransaction: ApiTransaction = {
  id: 'tx-01',
  type: 'expense',
  account_id: 'acc-01',
  category_id: 'cat-expense-01',
  amount: 85.5,
  description: 'Supermercado',
  date: '2026-03-27',
  created_at: '2026-03-27T10:00:00Z',
  updated_at: '2026-03-27T10:00:00Z',
};

const rawDashboard: ApiDashboardResponse = {
  global_balance: 12430,
  monthly_summary: {
    total_income: 4320,
    total_expense: 2150.75,
    net_balance: 2169.25,
  },
  expenses_by_category: [
    { category_id: 'cat-expense-01', category_name: 'Alimentación', total: 450 },
  ],
  recent_transactions: [rawTransaction],
};

const rawSummary: ApiSummaryResponse = {
  total_income: 4320,
  total_expense: 2150.75,
  balance: 2169.25,
};

describe('mapAccount', () => {
  it('maps snake_case fields to camelCase', () => {
    const account = mapAccount(rawAccount);
    expect(account.id).toBe('acc-01');
    expect(account.initialBalance).toBe(1000);
    expect(account.currentBalance).toBe(1500);
    expect(account.isActive).toBe(true);
    expect(account.createdAt).toBe('2024-01-01T00:00:00Z');
    expect(account.updatedAt).toBe('2024-06-01T00:00:00Z');
  });
});

describe('mapCategory', () => {
  it('maps snake_case fields to camelCase', () => {
    const category = mapCategory(rawCategory);
    expect(category.id).toBe('cat-expense-01');
    expect(category.isSystem).toBe(true);
    expect(category.isActive).toBe(true);
    expect(category.createdAt).toBe('2024-01-01T00:00:00Z');
  });
});

describe('mapTransaction', () => {
  it('maps snake_case fields to camelCase', () => {
    const tx = mapTransaction(rawTransaction);
    expect(tx.id).toBe('tx-01');
    expect(tx.accountId).toBe('acc-01');
    expect(tx.categoryId).toBe('cat-expense-01');
    expect(tx.amount).toBe(85.5);
  });
});

describe('mapDashboard', () => {
  it('maps nested dashboard response', () => {
    const dashboard = mapDashboard(rawDashboard);
    expect(dashboard.globalBalance).toBe(12430);
    expect(dashboard.monthlySummary.totalIncome).toBe(4320);
    expect(dashboard.monthlySummary.totalExpense).toBe(2150.75);
    expect(dashboard.monthlySummary.netBalance).toBe(2169.25);
    expect(dashboard.expensesByCategory[0].categoryId).toBe('cat-expense-01');
    expect(dashboard.expensesByCategory[0].categoryName).toBe('Alimentación');
    expect(dashboard.recentTransactions[0].accountId).toBe('acc-01');
  });
});

describe('mapSummary', () => {
  it('maps summary response', () => {
    const summary = mapSummary(rawSummary);
    expect(summary.totalIncome).toBe(4320);
    expect(summary.totalExpense).toBe(2150.75);
    expect(summary.balance).toBe(2169.25);
  });
});
