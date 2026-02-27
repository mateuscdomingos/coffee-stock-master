import { StoreRepository } from '@/core/ports/repositories/StoreRepository';
import { GetStoresByUserUseCase } from './GetStoresByUserUseCase.class';
import { getStoresByUserUseCase } from './getStoresByUserUseCase.fn';
import { Store } from '@/core/domain/Store/Store.class';

describe('GetStoresByUserUseCase', () => {
  const mockUserId = 'user-uuid-123';

  const mockStores = [
    new Store({
      id: 'store-1',
      name: 'Coffee Central',
      monthlyBudgetInCents: 500000,
      userId: mockUserId,
    }),
    new Store({
      id: 'store-2',
      name: 'Bakery Corner',
      monthlyBudgetInCents: 300000,
      userId: mockUserId,
    }),
  ];

  describe('Paradigm: Object-Oriented (OOP)', () => {
    let storeRepository: StoreRepository;

    beforeEach(() => {
      storeRepository = {
        save: jest.fn(),
        findById: jest.fn(),
        findAllByUserId: jest.fn().mockResolvedValue(mockStores),
      };
      jest.clearAllMocks();
    });

    it('should return all stores for a given user via class', async () => {
      const useCase = new GetStoresByUserUseCase(storeRepository);

      const result = await useCase.execute(mockUserId);

      expect(storeRepository.findAllByUserId).toHaveBeenCalledWith(mockUserId);
      expect(result).toHaveLength(2);
      expect(result).toEqual(mockStores);
    });

    it('should return an empty array if the user has no stores', async () => {
      (storeRepository.findAllByUserId as jest.Mock).mockResolvedValue([]);
      const useCase = new GetStoresByUserUseCase(storeRepository);

      const result = await useCase.execute(mockUserId);

      expect(result).toEqual([]);
    });
  });

  describe('Paradigm: Functional Programming (FP)', () => {
    let storeRepository: StoreRepository;

    beforeEach(() => {
      storeRepository = {
        save: jest.fn(),
        findById: jest.fn(),
        findAllByUserId: jest.fn().mockResolvedValue(mockStores),
      };
      jest.clearAllMocks();
    });

    it('should return all stores for a given user via function', async () => {
      const useCase = getStoresByUserUseCase(storeRepository);

      const result = await useCase(mockUserId);

      expect(storeRepository.findAllByUserId).toHaveBeenCalledWith(mockUserId);
      expect(result).toHaveLength(2);
      expect(result).toEqual(mockStores);
    });

    it('should return an empty array if the user has no stores via function', async () => {
      (storeRepository.findAllByUserId as jest.Mock).mockResolvedValue([]);
      const useCase = getStoresByUserUseCase(storeRepository);

      const result = await useCase(mockUserId);

      expect(result).toEqual([]);
    });
  });
});
