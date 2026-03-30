import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTransactions, createTransaction } from '../../infrastructure/api/transactionsService';
import type { CreateTransactionPayload } from '../../domain/entities';

export function useTransactions(type?: 'income' | 'expense') {
  return useQuery({
    queryKey: ['transactions', type],
    queryFn: () => fetchTransactions(type),
  });
}

export function useCreateTransaction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateTransactionPayload) => createTransaction(payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['transactions', variables.type] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['summary'] });
    },
  });
}
