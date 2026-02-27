import { InvalidCredentialsError } from '@/core/domain/Error/Error.class';
import { Hasher } from '@/core/ports/services/Hasher';
import { UserRepository } from '@/core/ports/repositories/UserRepository';
import { Logger } from '@/core/ports/services/Logger';

export type AuthenticateUserDTO = {
  email: string;
  password: string;
};

export class AuthenticateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hasher: Hasher,
    private readonly logger: Logger,
  ) {}

  async execute({ email, password }: AuthenticateUserDTO) {
    this.logger.info(AuthenticateUserUseCase.name, 'Login attempt', {
      email,
    });
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      this.logger.error(
        AuthenticateUserUseCase.name,
        'User not found at login',
        {
          email,
        },
      );
      throw new InvalidCredentialsError();
    }

    const isPasswordValid = await this.hasher.compare(
      password,
      user.props.passwordHash,
    );

    if (!isPasswordValid) {
      this.logger.error(AuthenticateUserUseCase.name, 'Incorrect password', {
        email,
      });
      throw new InvalidCredentialsError();
    }

    this.logger.info(
      AuthenticateUserUseCase.name,
      'User successfully authenticated',
      { userId: user.props.id },
    );

    return {
      id: user.props.id,
      name: user.props.name,
      email: user.props.email,
    };
  }
}
