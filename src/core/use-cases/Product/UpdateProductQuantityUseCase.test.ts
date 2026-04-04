import { ProductRepository } from '@/core/ports/repositories/ProductRepository';
import { Logger } from '@/core/ports/services/Logger';
import { Product } from '@/core/domain/Product/Product.class';
import { UpdateProductQuantityUseCase } from './UpdateProductQuantityUseCase.class';
import { updateProductQuantityUseCase } from './UpdateProductQuantityUseCase.fn';

describe('UpdateProductQuantityUseCase', () => {
  const logger: Logger = {
    error: jest.fn(),
    info: jest.fn(),
  };

  const existingProduct = new Product({
    id: 'prod-123',
    name: 'Espresso Blend',
    roast: 'medium',
    priceInCents: 4500,
    stockQuantity: 10,
    minimumStockQuantity: 2,
    unit: 'un',
    storeId: 'store-uuid-123',
  });

  describe('Paradigm: Object-Oriented (OOP)', () => {
    let productRepository: ProductRepository;

    beforeEach(() => {
      productRepository = {
        save: jest.fn().mockResolvedValue(undefined),
        findById: jest.fn().mockResolvedValue(existingProduct),
        findAllByStoreId: jest.fn(),
      };
      jest.clearAllMocks();
    });

    it('should increment product quantity via class', async () => {
      const useCase = new UpdateProductQuantityUseCase(
        productRepository,
        logger,
      );

      const result = await useCase.execute({
        productId: 'prod-123',
        type: 'increment',
      });

      expect(productRepository.findById).toHaveBeenCalledWith('prod-123');
      expect(productRepository.save).toHaveBeenCalledTimes(1);

      const savedProduct = (productRepository.save as jest.Mock).mock
        .calls[0][0];
      expect(savedProduct.props.stockQuantity).toBe(11);
      expect(result.stockQuantity).toBe(11);
    });

    it('should throw error if product is not found', async () => {
      productRepository.findById = jest.fn().mockResolvedValue(null);
      const useCase = new UpdateProductQuantityUseCase(
        productRepository,
        logger,
      );

      await expect(
        useCase.execute({ productId: 'invalid', type: 'increment' }),
      ).rejects.toThrow('Product not found');

      expect(logger.error).toHaveBeenCalled();
    });
  });

  describe('Paradigm: Functional Programming (FP)', () => {
    let productRepository: ProductRepository;

    beforeEach(() => {
      productRepository = {
        save: jest.fn().mockResolvedValue(undefined),
        findById: jest.fn().mockResolvedValue(existingProduct),
        findAllByStoreId: jest.fn(),
      };
      jest.clearAllMocks();
    });

    it('should decrement product quantity via function', async () => {
      const useCase = updateProductQuantityUseCase(productRepository, logger);

      const result = await useCase({
        productId: 'prod-123',
        type: 'decrement',
      });

      expect(productRepository.save).toHaveBeenCalledTimes(1);

      const savedProduct = (productRepository.save as jest.Mock).mock
        .calls[0][0];
      expect(savedProduct.props.stockQuantity).toBe(9);
      expect(result.stockQuantity).toBe(9);
    });

    it('should fail when trying to decrement below zero (Domain Protection)', async () => {
      const zeroStockProduct = new Product({
        ...existingProduct.props,
        stockQuantity: 0,
      });
      productRepository.findById = jest
        .fn()
        .mockResolvedValue(zeroStockProduct);

      const useCase = updateProductQuantityUseCase(productRepository, logger);

      await expect(
        useCase({ productId: 'prod-123', type: 'decrement' }),
      ).rejects.toThrow(/"stockQuantity" cannot be negative/);
    });
  });
});
