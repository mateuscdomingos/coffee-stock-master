import { UserAlreadyExistsError } from '@/core/domain/Error/Error.class';
import { User } from '@/core/domain/User/User.class';
import { UserProps } from '@/core/domain/User/user.types';
import { Hasher } from '@/core/ports/auth/Hasher';
import { UserRepository } from '@/core/ports/repositories/UserRepository';
import { Logger } from '@/core/ports/services/Logger';

export type RegisterUserProps = Omit<UserProps, 'passwordHash' | 'id'> & {
  password: string;
};

export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hasher: Hasher,
    private readonly logger: Logger,
  ) {}

  async execute(data: RegisterUserProps): Promise<void> {
    this.logger.info('RegisterUserUseCase', 'Starting new user registration', {
      email: data.email,
    });
    const userExists = await this.userRepository.findByEmail(data.email);
    if (userExists) {
      this.logger.error('RegisterUserUseCase', 'The email already exists', {
        email: data.email,
      });
      throw new UserAlreadyExistsError();
    }

    const passwordHash = await this.hasher.hash(data.password);

    const user = new User({
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      passwordHash,
      createdAt: data.createdAt ?? new Date(),
    });

    await this.userRepository.save(user);
    this.logger.info('RegisterUserUseCase', 'User successfully registered', {
      email: data.email,
    });
  }
}
