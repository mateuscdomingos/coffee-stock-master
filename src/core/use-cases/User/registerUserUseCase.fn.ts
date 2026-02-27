import { UserProps } from '@/core/domain/User/user.types';
import { createUser } from '@/core/domain/User/user.fn';
import { UserRepositoryFN } from '@/core/ports/repositories/UserRepository';
import { Hasher } from '@/core/ports/services/Hasher';
import { Logger } from '@/core/ports/services/Logger';
import {
  InvalidPasswordError,
  EmailAlreadyExistsError,
} from '@/core/domain/Error/Error.class';

export type RegisterUserProps = Omit<UserProps, 'passwordHash' | 'id'> & {
  password: string;
};

export const registerUserUseCase =
  (userRepository: UserRepositoryFN, hasher: Hasher, logger: Logger) =>
  async (data: RegisterUserProps): Promise<void> => {
    logger.info(registerUserUseCase.name, 'Starting new user registration', {
      email: data.email,
    });
    const userExists = await userRepository.findByEmail(data.email);
    if (userExists) {
      logger.info(registerUserUseCase.name, 'The email already exists', {
        email: data.email,
      });
      throw new EmailAlreadyExistsError();
    }

    if (data.password.length < 8) {
      throw new InvalidPasswordError();
    }
    const passwordHash = await hasher.hash(data.password);

    const user = createUser({
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      passwordHash,
      createdAt: data.createdAt ?? new Date(),
    });

    await userRepository.save(user);
    logger.info(registerUserUseCase.name, 'User successfully registered', {
      email: data.email,
    });
  };
