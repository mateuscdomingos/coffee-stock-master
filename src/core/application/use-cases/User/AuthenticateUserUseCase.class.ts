import { Hasher } from '@/core/ports/auth/Hasher';
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
    this.logger.info('AuthenticateUserUseCase', 'Login attempt', {
      email,
    });
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      this.logger.error('AuthenticateUserUseCase', 'User not found at login', {
        email,
      });
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await this.hasher.compare(
      password,
      user.props.passwordHash,
    );

    if (!isPasswordValid) {
      this.logger.error('AuthenticateUserUseCase', 'Incorrect password', {
        email,
      });
      throw new Error('Invalid credentials');
    }

    this.logger.info(
      'AuthenticateUserUseCase',
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
