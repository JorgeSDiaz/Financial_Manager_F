import { apiClient } from './apiClient';

export async function exportCsv(): Promise<string> {
  const { data } = await apiClient.get<string>('/api/v1/export/csv');
  return data;
}

export async function exportJson(): Promise<string> {
  const { data } = await apiClient.get<string>('/api/v1/export/json');
  return data;
}

export async function exportPdf(): Promise<Blob> {
  const { data } = await apiClient.get<Blob>('/api/v1/export/pdf', {
    responseType: 'blob',
  });
  return data;
}
