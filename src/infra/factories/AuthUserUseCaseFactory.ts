import { AuthenticateUserUseCase } from '@/core/use-cases/User/AuthenticateUserUseCase.class';
import { PrismaUserRepository } from '../database/prisma/PrismaUserRepository';
import { BcryptHasher } from '../services/hasher/BcryptHasher.class';
import { ConsoleLogger } from '../services/logger/ConsoleLogger.class';

export class AuthUserUseCaseFactory {
  static makeAuthUserUseCase() {
    const userRepository = new PrismaUserRepository();
    const logger = new ConsoleLogger();
    const hasher = new BcryptHasher();

    return new AuthenticateUserUseCase(userRepository, hasher, logger);
  }

  static makeLogger() {
    return new ConsoleLogger();
  }
}
