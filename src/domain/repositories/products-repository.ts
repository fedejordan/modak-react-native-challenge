import type { Product } from '../models/product';

export interface ProductsRepository {
  getAll(): Promise<Product[]>;
  getByCategory(category: string): Promise<Product[]>;
  getById(id: number): Promise<Product>;
}
