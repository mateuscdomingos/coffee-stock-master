import { ProductRepository } from '@/core/ports/repositories/ProductRepository';
import { CreateProductUseCase } from './CreateProductUseCase.class';
import { createProductUseCase } from './createProductUseCase.fn';
import { Logger } from '@/core/ports/services/Logger';
import { Product } from '@/core/domain/Product/Product.class';

describe('CreateProductUseCase', () => {
  const logger: Logger = {
    error: jest.fn(),
    info: jest.fn(),
  };

  const mockProductData = {
    name: 'Espresso Blend',
    roast: 'medium' as const,
    priceInCents: 4500,
    stockQuantity: 10,
    minimumStockQuantity: 2,
    unit: 'un',
    storeId: 'store-uuid-123',
  };

  describe('Paradigm: Object-Oriented (OOP)', () => {
    let productRepository: ProductRepository;

    beforeEach(() => {
      productRepository = {
        save: jest.fn().mockResolvedValue(undefined),
        findById: jest.fn(),
        findAllByStoreId: jest.fn(),
      };
      jest.clearAllMocks();
    });

    it('should create a new product via class', async () => {
      const useCase = new CreateProductUseCase(productRepository, logger);

      await useCase.execute(mockProductData);

      expect(logger.info).toHaveBeenCalledWith(
        'CreateProductUseCase',
        'Initializing product creation',
        expect.objectContaining({ name: mockProductData.name }),
      );

      expect(productRepository.save).toHaveBeenCalledTimes(1);

      const savedProduct = (productRepository.save as jest.Mock).mock
        .calls[0][0];
      expect(savedProduct).toBeInstanceOf(Product);
      expect(savedProduct.props.name).toBe(mockProductData.name);
      expect(savedProduct.props.roast).toBe(mockProductData.roast);
    });
  });

  describe('Paradigm: Functional Programming (FP)', () => {
    let productRepository: ProductRepository;

    beforeEach(() => {
      productRepository = {
        save: jest.fn().mockResolvedValue(undefined),
        findById: jest.fn(),
        findAllByStoreId: jest.fn(),
      };
      jest.clearAllMocks();
    });

    it('should create and save a new product via function', async () => {
      const useCase = createProductUseCase(productRepository, logger);

      await useCase(mockProductData);

      expect(logger.info).toHaveBeenCalledWith(
        'createProductUseCase',
        'Initializing product creation',
        expect.objectContaining({ name: mockProductData.name }),
      );

      expect(productRepository.save).toHaveBeenCalledTimes(1);

      const savedProduct = (productRepository.save as jest.Mock).mock
        .calls[0][0];
      expect(savedProduct).toBeInstanceOf(Product);
      expect(savedProduct.props.priceInCents).toBe(
        mockProductData.priceInCents,
      );
      expect(savedProduct.props.storeId).toBe(mockProductData.storeId);
    });
  });
});
