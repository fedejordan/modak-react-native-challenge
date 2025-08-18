import type { ProductsRepository } from '@/domain/repositories/products-repository';
import type { Product } from '@/domain/models/product';
import type { Category } from '@/domain/models/category';
import type { ProductDTO, ProductsResponseDTO } from '@/data/dto/product.dto';
import { toDomainProduct } from '@/data/mappers/product.mapper';
import { API_BASE_URL } from '@/config/env';

const http = async <T>(path: string): Promise<T> => {
  const url = `${API_BASE_URL}${path}`;
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status} ${res.statusText} — ${url} — ${text}`);
  }
  return (await res.json()) as T;
};

export class ProductsHttpRepository implements ProductsRepository {
  async getAll(): Promise<Product[]> {
    const data = await http<ProductsResponseDTO>('/products');
    return (data.products ?? []).map(toDomainProduct);
  }

  async getByCategory(category: string): Promise<Product[]> {
    const data = await http<ProductsResponseDTO>(
      `/products/category/${encodeURIComponent(category)}`,
    );
    return (data.products ?? []).map(toDomainProduct);
  }

  async getById(id: number): Promise<Product> {
    const dto = await http<ProductDTO>(`/products/${id}`);
    return toDomainProduct(dto);
  }

  async getCategories(): Promise<Category[]> {
    const raw = await http<any>('/products/categories');
    if (Array.isArray(raw)) {
      if (raw.length > 0 && typeof raw[0] === 'string') return raw as string[];
      return raw.map((c: any) => c.slug ?? c.name ?? String(c));
    }
    return [];
  }
}
