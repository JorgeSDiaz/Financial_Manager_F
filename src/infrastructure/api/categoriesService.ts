import { apiClient } from './apiClient';
import type { ApiCategory } from './types';
import { mapCategory } from './mappers';
import type { Category, CreateCategoryPayload, UpdateCategoryPayload } from '../../domain/entities';

export async function fetchCategories(): Promise<Category[]> {
  const { data } = await apiClient.get<ApiCategory[]>('/api/v1/categories');
  return data.map(mapCategory);
}

export async function createCategory(payload: CreateCategoryPayload): Promise<Category> {
  const { data } = await apiClient.post<ApiCategory>('/api/v1/categories', payload);
  return mapCategory(data);
}

export async function updateCategory(id: string, payload: UpdateCategoryPayload): Promise<Category> {
  const { data } = await apiClient.put<ApiCategory>(`/api/v1/categories/${id}`, payload);
  return mapCategory(data);
}

export async function deleteCategory(id: string): Promise<void> {
  await apiClient.delete(`/api/v1/categories/${id}`);
}
