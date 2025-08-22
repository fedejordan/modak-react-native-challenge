import { CategoriesRepository } from '@/domain/repositories/categories-repository';
import { HTTPClient } from '../http-client';
import { Category } from '@/domain/models/category';

export class CategoriesHttpRepository implements CategoriesRepository {
  async getCategories(): Promise<Category[]> {
    const raw = await HTTPClient<unknown>('/products/categories');
    if (Array.isArray(raw)) {
      if (raw.length > 0 && typeof raw[0] === 'string') return raw as string[];
      return raw.map((c: { slug?: string; name?: string }) => c.slug ?? c.name ?? String(c));
    }
    return [];
  }
}
