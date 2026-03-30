import { apiClient } from './apiClient';
import type { ApiDashboardResponse } from './types';
import { mapDashboard } from './mappers';
import type { DashboardSummary } from '../../domain/entities';

export async function fetchDashboard(): Promise<DashboardSummary> {
  const { data } = await apiClient.get<ApiDashboardResponse>('/api/v1/dashboard');
  return mapDashboard(data);
}
