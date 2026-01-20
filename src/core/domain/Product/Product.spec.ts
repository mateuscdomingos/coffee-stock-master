import { Product } from './Product';

describe('Product', () => {
  describe('when creating a product', () => {
    it('should create a product instance', () => {
      const product = new Product({
        id: '1',
        name: 'Coffee Beans',
        description: 'Premium coffee beans',
        price: 15.99,
        stockQuantity: 100,
        minimumStockQuantity: 10,
        unit: 'kg',
        storeId: 'store-123',
      });

      expect(product.props.id).toBe('1');
      expect(product.props.name).toBe('Coffee Beans');
      expect(product.props.description).toBe('Premium coffee beans');
      expect(product.props.price).toBe(15.99);
      expect(product.props.stockQuantity).toBe(100);
      expect(product.props.minimumStockQuantity).toBe(10);
      expect(product.props.unit).toBe('kg');
      expect(product.props.storeId).toBe('store-123');
    });

    it('should throw an error for negative stock quantity', () => {
      expect(
        () =>
          new Product({
            id: '1',
            name: 'Coffee Beans',
            description: 'Premium coffee beans',
            price: 15.99,
            stockQuantity: -10,
            minimumStockQuantity: 10,
            unit: 'kg',
            storeId: 'store-123',
          }),
      ).toThrow('stockQuantity cannot be negative');
    });

    it('should throw an error for negative minimum stock quantity', () => {
      expect(
        () =>
          new Product({
            id: '1',
            name: 'Coffee Beans',
            description: 'Premium coffee beans',
            price: 15.99,
            stockQuantity: 100,
            minimumStockQuantity: -5,
            unit: 'kg',
            storeId: 'store-123',
          }),
      ).toThrow('minimumStockQuantity cannot be negative');
    });
  });

  describe('updateStockQuantity', () => {
    it('should update stock quantity', () => {
      const product = new Product({
        id: '1',
        name: 'Coffee Beans',
        description: 'Premium coffee beans',
        price: 15.99,
        stockQuantity: 100,
        minimumStockQuantity: 10,
        unit: 'kg',
        storeId: 'store-123',
      });

      const updatedProduct = product.updateStockQuantity(80);
      expect(updatedProduct.props.stockQuantity).toBe(80);
      expect(product.props.stockQuantity).toBe(100);
    });

    it('should throw error for negative stock quantity', () => {
      const product = new Product({
        id: '1',
        name: 'Coffee Beans',
        description: 'Premium coffee beans',
        price: 15.99,
        stockQuantity: 100,
        minimumStockQuantity: 10,
        unit: 'kg',
        storeId: 'store-123',
      });

      expect(() => product.updateStockQuantity(-10)).toThrow(
        'stockQuantity cannot be negative',
      );
    });
  });

  describe('updateMinimumStockQuantity', () => {
    it('should update minimum stock quantity', () => {
      const product = new Product({
        id: '1',
        name: 'Coffee Beans',
        description: 'Premium coffee beans',
        price: 15.99,
        stockQuantity: 100,
        minimumStockQuantity: 10,
        unit: 'kg',
        storeId: 'store-123',
      });

      const updatedProduct = product.updateMinimumStockQuantity(5);
      expect(updatedProduct.props.minimumStockQuantity).toBe(5);
      expect(product.props.minimumStockQuantity).toBe(10);
    });

    it('should throw error for negative minimum stock quantity', () => {
      const product = new Product({
        id: '1',
        name: 'Coffee Beans',
        description: 'Premium coffee beans',
        price: 15.99,
        stockQuantity: 100,
        minimumStockQuantity: 10,
        unit: 'kg',
        storeId: 'store-123',
      });

      expect(() => product.updateMinimumStockQuantity(-10)).toThrow(
        'minimumStockQuantity cannot be negative',
      );
    });
  });
});
