import { UpdateProductQuantityUseCase } from '@/core/use-cases/Product/UpdateProductQuantityUseCase.class';
import { PrismaProductRepository } from '../database/prisma/PrismaProductRepository';
import { ConsoleLogger } from '../services/logger/ConsoleLogger.class';

export class UpdateProductQuantityUseCaseFactory {
  static makeUpdateProductQuantityUseCase() {
    const productRepository = new PrismaProductRepository();

    const logger = new ConsoleLogger();

    return new UpdateProductQuantityUseCase(productRepository, logger);
  }

  static makeLogger() {
    return new ConsoleLogger();
  }
}
