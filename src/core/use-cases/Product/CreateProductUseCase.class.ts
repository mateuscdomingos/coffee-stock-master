import { Product } from '@/core/domain/Product/Product.class';
import { ProductProps } from '@/core/domain/Product/product.types';
import { ProductRepository } from '@/core/ports/repositories/ProductRepository';
import { Logger } from '@/core/ports/services/Logger';

export type CreateProductProps = Omit<ProductProps, 'id'>;

export class CreateProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly logger: Logger,
  ) {}

  async execute(data: CreateProductProps) {
    this.logger.info(
      CreateProductUseCase.name,
      'Initializing product creation',
      {
        name: data.name,
        storeId: data.storeId,
      },
    );

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

    await this.productRepository.save(product);

    this.logger.info(
      CreateProductUseCase.name,
      'Product successfully registered',
      {
        id: product.props.id,
        name: product.props.name,
      },
    );

    return product.props;
  }
}
