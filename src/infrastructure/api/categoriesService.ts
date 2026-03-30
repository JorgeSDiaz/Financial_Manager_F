import { apiClient } from './apiClient';
import type { ApiCategory } from './types';
import { mapCategory } from './mappers';
import type { Category, CreateCategoryPayload } from '../../domain/entities';

export async function fetchCategories(): Promise<Category[]> {
  const { data } = await apiClient.get<ApiCategory[]>('/api/v1/categories');
  return data.map(mapCategory);
}

export async function createCategory(payload: CreateCategoryPayload): Promise<Category> {
  const { data } = await apiClient.post<ApiCategory>('/api/v1/categories', payload);
  return mapCategory(data);
}
