import { ProductProps } from './Product.types';

export class Product {
  constructor(public readonly props: ProductProps) {
    this.validateQuantity(props.stockQuantity, 'stockQuantity');
    this.validateQuantity(props.minimumStockQuantity, 'minimumStockQuantity');
  }

  private validateQuantity(quantity: number, fieldName: string): void {
    if (quantity < 0) {
      throw new Error(`${fieldName} cannot be negative`);
    }
  }

  updateStockQuantity(quantity: number) {
    this.validateQuantity(quantity, 'stockQuantity');
    return new Product({ ...this.props, stockQuantity: quantity });
  }

  updateMinimumStockQuantity(quantity: number) {
    this.validateQuantity(quantity, 'minimumStockQuantity');
    return new Product({ ...this.props, minimumStockQuantity: quantity });
  }
}
