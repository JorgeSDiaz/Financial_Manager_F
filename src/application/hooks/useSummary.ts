import { useQuery } from '@tanstack/react-query';
import { fetchSummary } from '../../infrastructure/api/transactionsService';

export function useSummary() {
  return useQuery({
    queryKey: ['summary'],
    queryFn: fetchSummary,
  });
}
