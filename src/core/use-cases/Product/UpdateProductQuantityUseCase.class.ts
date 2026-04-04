import { Product } from '@/core/domain/Product/Product.class';
import { ProductRepository } from '@/core/ports/repositories/ProductRepository';
import { Logger } from '@/core/ports/services/Logger';

export interface UpdateProductQuantityProps {
  productId: string;
  type: 'increment' | 'decrement';
}

export class UpdateProductQuantityUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly logger: Logger,
  ) {}

  async execute(data: UpdateProductQuantityProps) {
    this.logger.info(
      UpdateProductQuantityUseCase.name,
      'Initializing product quantity update',
      { productId: data.productId, type: data.type },
    );

    const product = await this.productRepository.findById(data.productId);

    if (!product) {
      this.logger.error(
        UpdateProductQuantityUseCase.name,
        'Product not found',
        {
          productId: data.productId,
        },
      );
      throw new Error('Product not found');
    }

    let newProduct: Product;

    if (data.type === 'decrement') {
      newProduct = product.decrementStock();
    } else {
      newProduct = product.incrementStock();
    }

    await this.productRepository.save(newProduct);

    this.logger.info(
      UpdateProductQuantityUseCase.name,
      'Product quantity successfully updated',
      {
        id: newProduct.props.id,
        newQuantity: newProduct.props.stockQuantity,
      },
    );

    return newProduct.props;
  }
}
