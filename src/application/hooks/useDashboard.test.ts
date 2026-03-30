import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createElement } from 'react';
import { useDashboard } from './useDashboard';
import type { DashboardSummary } from '../../domain/entities';

vi.mock('../../infrastructure/api/dashboardService');

import { fetchDashboard } from '../../infrastructure/api/dashboardService';

const mockDashboard: DashboardSummary = {
  globalBalance: 12430,
  monthlySummary: { totalIncome: 4320, totalExpense: 2150.75, netBalance: 2169.25 },
  expensesByCategory: [{ categoryId: 'cat-01', categoryName: 'Alimentación', total: 450 }],
  recentTransactions: [],
};

function makeWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children);
}

describe('useDashboard', () => {
  it('returns data on success', async () => {
    vi.mocked(fetchDashboard).mockResolvedValue(mockDashboard);
    const { result } = renderHook(() => useDashboard(), { wrapper: makeWrapper() });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockDashboard);
  });

  it('returns error on failure', async () => {
    vi.mocked(fetchDashboard).mockRejectedValue(new Error('Network error'));
    const { result } = renderHook(() => useDashboard(), { wrapper: makeWrapper() });
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBeInstanceOf(Error);
  });
});
