import { Category } from '../models/category';

export interface CategoriesRepository {
  getCategories(): Promise<Category[]>;
}
