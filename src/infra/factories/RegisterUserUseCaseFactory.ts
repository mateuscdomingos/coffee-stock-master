import { RegisterUserUseCase } from '@/core/use-cases/User/RegisterUserUseCase.class';
import { PrismaUserRepository } from '../database/prisma/PrismaUserRepository';
import { BcryptHasher } from '../services/hasher/BcryptHasher.class';
import { ConsoleLogger } from '../services/logger/ConsoleLogger.class';

export class RegisterUserUseCaseFactory {
  static makeRegisterUserUseCase() {
    const userRepository = new PrismaUserRepository();
    const logger = new ConsoleLogger();
    const hasher = new BcryptHasher();

    return new RegisterUserUseCase(userRepository, hasher, logger);
  }

  static makeLogger() {
    return new ConsoleLogger();
  }
}
