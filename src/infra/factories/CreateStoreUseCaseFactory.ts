import { CreateStoreUseCase } from '@/core/use-cases/Store/CreateStoreUseCase.class';
import { ConsoleLogger } from '../services/logger/ConsoleLogger.class';
import { PrismaStoreRepository } from '../database/prisma/PrismaStoreRepository';

export class CreateStoreUseCaseFactory {
  static makeCreateStoreUseCase() {
    const storeRepository = new PrismaStoreRepository();
    const logger = new ConsoleLogger();

    return new CreateStoreUseCase(storeRepository, logger);
  }

  static makeLogger() {
    return new ConsoleLogger();
  }
}
