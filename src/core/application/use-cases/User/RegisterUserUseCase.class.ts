import { User } from '@/core/domain/User/User.class';
import { UserProps } from '@/core/domain/User/user.types';
import { Hasher } from '@/core/ports/auth/Hasher';
import { UserRepository } from '@/core/ports/repositories/UserRepository';

export type RegisterUserProps = Omit<UserProps, 'passwordHash' | 'id'> & {
  password: string;
};

export class RegisterUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private hasher: Hasher,
  ) {}

  async execute(data: RegisterUserProps): Promise<void> {
    const userExists = await this.userRepository.findByEmail(data.email);
    if (userExists) {
      throw new Error('User already exists');
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
  }
}
