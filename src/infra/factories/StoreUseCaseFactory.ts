import { getStoresByUserUseCase } from '@/core/use-cases/Store/getStoresByUserUseCase.fn';
import { PrismaStoreRepository } from '../database/prisma/PrismaStoreRepository';

export class StoreUseCaseFactory {
  static makeGetStoresByUser() {
    const repository = new PrismaStoreRepository();
    return getStoresByUserUseCase(repository);
  }
}
