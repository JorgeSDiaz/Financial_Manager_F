import { apiClient } from './apiClient';
import type { ApiAccountsResponse, ApiAccount } from './types';
import { mapAccount } from './mappers';
import type { Account, CreateAccountPayload, UpdateAccountPayload } from '../../domain/entities';

export async function fetchAccounts(): Promise<{ accounts: Account[]; globalBalance: number }> {
  const { data } = await apiClient.get<ApiAccountsResponse>('/api/v1/accounts');
  return {
    accounts: data.accounts.map(mapAccount),
    globalBalance: data.global_balance,
  };
}

export async function createAccount(payload: CreateAccountPayload): Promise<Account> {
  const { data } = await apiClient.post<ApiAccount>('/api/v1/accounts', payload);
  return mapAccount(data);
}

export async function updateAccount(id: string, payload: UpdateAccountPayload): Promise<Account> {
  const { data } = await apiClient.put<ApiAccount>(`/api/v1/accounts/${id}`, payload);
  return mapAccount(data);
}

export async function deleteAccount(id: string): Promise<void> {
  await apiClient.delete(`/api/v1/accounts/${id}`);
}
