import { InvalidCredentialsError } from '@/core/domain/Error/Error.class';
import { Hasher } from '@/core/ports/services/Hasher';
import { UserRepositoryFN } from '@/core/ports/repositories/UserRepository';
import { Logger } from '@/core/ports/services/Logger';

export type AuthenticateUserDTO = {
  email: string;
  password: string;
};

export const authenticateUserUseCase =
  (userRepository: UserRepositoryFN, hasher: Hasher, logger: Logger) =>
  async ({ email, password }: AuthenticateUserDTO) => {
    logger.info(authenticateUserUseCase.name, 'Login attempt', {
      email,
    });
    const user = await userRepository.findByEmail(email);

    if (!user) {
      logger.error(authenticateUserUseCase.name, 'User not found at login', {
        email,
      });
      throw new InvalidCredentialsError();
    }

    const isPasswordValid = await hasher.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      logger.error(authenticateUserUseCase.name, 'Incorrect password', {
        email,
      });
      throw new InvalidCredentialsError();
    }

    logger.info(
      authenticateUserUseCase.name,
      'User successfully authenticated',
      {
        userId: user.id,
      },
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  };
