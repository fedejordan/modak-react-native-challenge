import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Product } from '@/domain/models/product';
import type { Category } from '@/domain/models/category';
import type { ProductsRepository } from '@/domain/repositories/products-repository';
import { ProductsHttpRepository } from '@/data/repositories/products-http.repository';
import type { SortBy } from '@/domain/types/sort';
import { CategoriesRepository } from '@/domain/repositories/categories-repository';
import { CategoriesHttpRepository } from '@/data/repositories/categories-http.repository';

const productsRepository: ProductsRepository = new ProductsHttpRepository();
const categoriesRepository: CategoriesRepository = new CategoriesHttpRepository();

type State = {
  products: Product[];
  categories: Category[];
  selectedCategory: string | null;
  sortBy: SortBy;
  loading: boolean;
  error: string | null;
};

type Actions = {
  setCategory: (category: string | null) => void;
  setSort: (sort: SortBy) => void;
  clearError: () => void;

  fetchCategories: () => Promise<void>;
  fetchProducts: () => Promise<void>;
  fetchProductById: (id: number) => Promise<Product>;
};

// Derivados útiles (selectores computados)
const sortProducts = (list: Product[], sortBy: SortBy) => {
  if (!sortBy) return list;
  const copy = [...list];
  if (sortBy === 'price') copy.sort((a, b) => a.price - b.price);
  if (sortBy === 'rating') copy.sort((a, b) => b.rating - a.rating);
  return copy;
};

export const useProductsStore = create<State & Actions>()(
  devtools((set, get) => ({
    // state
    products: [],
    categories: [],
    selectedCategory: null,
    sortBy: null,
    loading: false,
    error: null,

    // actions sync
    setCategory: (category) => set({ selectedCategory: category }),
    setSort: (sort) => set({ sortBy: sort }),
    clearError: () => set({ error: null }),

    // actions async
    fetchCategories: async () => {
      set({ loading: true, error: null });
      try {
        const categories = await categoriesRepository.getCategories();
        set({ categories });
      } catch (e: any) {
        set({ error: String(e) });
      } finally {
        set({ loading: false });
      }
    },

    fetchProducts: async () => {
      set({ loading: true, error: null });
      try {
        const { selectedCategory, sortBy } = get();
        const products = selectedCategory
          ? await productsRepository.getByCategory(selectedCategory)
          : await productsRepository.getAll();
        set({ products: sortProducts(products, sortBy) });
      } catch (e: any) {
        set({ error: String(e) });
      } finally {
        set({ loading: false });
      }
    },

    fetchProductById: async (id: number) => {
      // devuelve el producto y actualiza el listado en memoria (merge/replace)
      const product = await productsRepository.getById(id);
      const current = get().products;
      const idx = current.findIndex((p) => p.id === product.id);
      const next =
        idx === -1
          ? [...current, product]
          : current.map((p) => (p.id === product.id ? product : p));
      const { sortBy } = get();
      set({ products: sortProducts(next, sortBy) });
      return product;
    },
  })),
);

// Selectores de conveniencia
export const useVisibleProducts = () => useProductsStore((s) => sortProducts(s.products, s.sortBy));
export const useCategories = () => useProductsStore((s) => s.categories);
export const useLoading = () => useProductsStore((s) => s.loading);
export const useError = () => useProductsStore((s) => s.error);
export const useFilters = () =>
  useProductsStore((s) => ({ selectedCategory: s.selectedCategory, sortBy: s.sortBy }));
