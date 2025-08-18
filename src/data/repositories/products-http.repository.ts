import type { ProductsRepository } from '@/domain/repositories/products-repository';
import type { Product } from '@/domain/models/product';
import type { ProductDTO, ProductsResponseDTO } from '@/data/dto/product.dto';
import { toDomainProduct } from '@/data/mappers/product.mapper';
import { HTTPClient } from '@/data/http-client';

export class ProductsHttpRepository implements ProductsRepository {
  async getAll(): Promise<Product[]> {
    const data = await HTTPClient<ProductsResponseDTO>('/products');
    return (data.products ?? []).map(toDomainProduct);
  }

  async getByCategory(category: string): Promise<Product[]> {
    const data = await HTTPClient<ProductsResponseDTO>(
      `/products/category/${encodeURIComponent(category)}`,
    );
    return (data.products ?? []).map(toDomainProduct);
  }

  async getById(id: number): Promise<Product> {
    const dto = await HTTPClient<ProductDTO>(`/products/${id}`);
    return toDomainProduct(dto);
  }
}
