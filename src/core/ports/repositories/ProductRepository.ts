import { Product } from '@/core/domain/Product/Product.class';
import { Product as ProductType } from '@/core/domain/Product/product.types';

export interface ProductRepository {
  save(product: Product): Promise<void>;
  findById(id: string): Promise<Product | null>;
  findAllByStoreId(storeId: string): Promise<Product[]>;
}

export interface ProductRepositoryFN {
  save(product: ProductType): Promise<void>;
  findById(id: string): Promise<ProductType | null>;
  findAllByStoreId(storeId: string): Promise<ProductType[]>;
}
