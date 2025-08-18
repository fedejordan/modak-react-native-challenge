import type { Product } from '../models/product';
import type { Category } from '../models/category';

export interface ProductsRepository {
  getAll(): Promise<Product[]>;
  getByCategory(category: string): Promise<Product[]>;
  getById(id: number): Promise<Product>;
  getCategories(): Promise<Category[]>;
}
