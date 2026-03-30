import { apiClient } from './apiClient';
import type { ApiTransactionsResponse, ApiTransaction, ApiSummaryResponse } from './types';
import { mapTransaction, mapSummary } from './mappers';
import type { Transaction, CreateTransactionPayload } from '../../domain/entities';

export async function fetchTransactions(type?: 'income' | 'expense'): Promise<Transaction[]> {
  if (type === 'income') {
    const { data } = await apiClient.get<ApiTransactionsResponse>('/api/v1/transactions/incomes');
    return data.transactions.map(mapTransaction);
  }
  if (type === 'expense') {
    const { data } = await apiClient.get<ApiTransactionsResponse>('/api/v1/transactions/expenses');
    return data.transactions.map(mapTransaction);
  }
  // No type specified — fetch both and merge
  const [incomes, expenses] = await Promise.all([
    apiClient.get<ApiTransactionsResponse>('/api/v1/transactions/incomes'),
    apiClient.get<ApiTransactionsResponse>('/api/v1/transactions/expenses'),
  ]);
  return [
    ...incomes.data.transactions.map(mapTransaction),
    ...expenses.data.transactions.map(mapTransaction),
  ];
}

export async function fetchSummary() {
  const { data } = await apiClient.get<ApiSummaryResponse>('/api/v1/transactions/summary');
  return mapSummary(data);
}

export async function createTransaction(payload: CreateTransactionPayload): Promise<Transaction> {
  const endpoint =
    payload.type === 'income'
      ? '/api/v1/transactions/incomes'
      : '/api/v1/transactions/expenses';
  const { data } = await apiClient.post<ApiTransaction>(endpoint, payload);
  return mapTransaction(data);
}
