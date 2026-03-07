import { Product } from '@/core/domain/Product/Product.class';
import { ProductRepository } from '@/core/ports/repositories/ProductRepository';
import { Logger } from '@/core/ports/services/Logger';
import { CreateProductProps } from './CreateProductUseCase.class';

export const createProductUseCase =
  (productRepository: ProductRepository, logger: Logger) =>
  async (data: CreateProductProps): Promise<void> => {
    logger.info(createProductUseCase.name, 'Initializing product creation', {
      name: data.name,
      storeId: data.storeId,
    });

    const product = new Product({
      id: crypto.randomUUID(),
      name: data.name,
      roast: data.roast,
      priceInCents: data.priceInCents,
      stockQuantity: data.stockQuantity,
      minimumStockQuantity: data.minimumStockQuantity,
      unit: data.unit,
      storeId: data.storeId,
    });

    await productRepository.save(product);

    logger.info(createProductUseCase.name, 'Product successfully registered', {
      id: product.props.id,
      name: product.props.name,
    });
  };
