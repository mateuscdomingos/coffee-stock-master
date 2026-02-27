import { StoreRepository } from '@/core/ports/repositories/StoreRepository';

export const getStoresByUserUseCase =
  (storeRepository: StoreRepository) => async (userId: string) => {
    return await storeRepository.findAllByUserId(userId);
  };
