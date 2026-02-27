import { StoreRepository } from '@/core/ports/repositories/StoreRepository';

export class GetStoresByUserUseCase {
  constructor(private readonly storeRepository: StoreRepository) {}

  async execute(userId: string) {
    return await this.storeRepository.findAllByUserId(userId);
  }
}
