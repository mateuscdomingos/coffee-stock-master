import { StoreRepository } from '@/core/ports/repositories/StoreRepository';
import { CreateStoreUseCase } from './CreateStoreUseCase.class';
import { createStoreUseCase } from './createStoreUseCase.fn';
import { Logger } from '@/core/ports/services/Logger';
import { Store } from '@/core/domain/Store/Store.class';

describe('CreateStoreUseCase', () => {
  const logger: Logger = {
    error: jest.fn(),
    info: jest.fn(),
  };

  const mockStoreData = {
    name: 'Coffee Central',
    monthlyBudgetInCents: 500000,
    userId: 'user-uuid-123',
  };

  describe('Paradigm: Object-Oriented (OOP)', () => {
    let storeRepository: StoreRepository;

    beforeEach(() => {
      storeRepository = {
        save: jest.fn().mockResolvedValue(undefined),
        findById: jest.fn(),
      };
      jest.clearAllMocks();
    });

    it('should create a new store via class', async () => {
      const useCase = new CreateStoreUseCase(storeRepository, logger);

      await useCase.execute(mockStoreData);

      expect(logger.info).toHaveBeenCalledWith(
        'CreateStoreUseCase',
        'Initial store creation',
        { name: mockStoreData.name },
      );

      expect(storeRepository.save).toHaveBeenCalledTimes(1);

      const savedStore = (storeRepository.save as jest.Mock).mock.calls[0][0];
      expect(savedStore).toBeInstanceOf(Store);
      expect(savedStore.props.name).toBe(mockStoreData.name);
      expect(savedStore.props.userId).toBe(mockStoreData.userId);
    });
  });

  describe('Paradigm: Functional Programming (FP)', () => {
    let storeRepository: StoreRepository;

    beforeEach(() => {
      storeRepository = {
        save: jest.fn().mockResolvedValue(undefined),
        findById: jest.fn(),
      };
      jest.clearAllMocks();
    });

    it('should create and save a new store via function', async () => {
      const useCase = createStoreUseCase(storeRepository, logger);

      await useCase(mockStoreData);

      expect(logger.info).toHaveBeenCalledWith(
        'createStoreUseCase',
        'Initial store creation',
        { name: mockStoreData.name },
      );

      expect(storeRepository.save).toHaveBeenCalledTimes(1);

      const savedStore = (storeRepository.save as jest.Mock).mock.calls[0][0];
      expect(savedStore).toBeInstanceOf(Store);
      expect(savedStore.props.monthlyBudgetInCents).toBe(
        mockStoreData.monthlyBudgetInCents,
      );
    });
  });
});
