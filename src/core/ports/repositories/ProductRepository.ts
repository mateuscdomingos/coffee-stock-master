import { Product } from './Product.class';

export interface ProductRepository {
  save(product: Product): Promise<void>;
  findById(id: string): Promise<Product | null>;
  findAllByStoreId(storeId: string): Promise<Product[]>;
}
