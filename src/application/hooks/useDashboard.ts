import { useQuery } from '@tanstack/react-query';
import { fetchDashboard } from '../../infrastructure/api/dashboardService';

export function useDashboard() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: fetchDashboard,
  });
}
