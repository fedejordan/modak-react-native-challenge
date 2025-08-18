import type { Product } from '@/domain/models/product';
import type { ProductDTO } from '@/data/dto/product.dto';

export const toDomainProduct = (dto: ProductDTO): Product => ({
  id: dto.id,
  title: dto.title,
  price: dto.price,
  rating: dto.rating,
  thumbnail: dto.thumbnail,
  brand: dto.brand,
  description: dto.description,
  stock: dto.stock,
  category: dto.category,
});
