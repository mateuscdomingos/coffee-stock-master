import { User } from '@/core/domain/User/User.class';
import { UserRepository } from '@/core/domain/User/UserRepository';
import { UserProps } from '@/core/domain/User/user.types';
import bcrypt from 'bcryptjs';

export type RegisterUserDTO = Omit<UserProps, 'passwordHash'> & {
  password: string;
};

export class RegisterUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(data: RegisterUserDTO): Promise<void> {
    const userExists = await this.userRepository.findByEmail(data.email);
    if (userExists) {
      throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(6);
    const passwordHash = await bcrypt.hash(data.password, salt);

    const user = new User({
      id: data.id,
      name: data.name,
      email: data.email,
      passwordHash,
      createdAt: data.createdAt ?? new Date(),
    });

    await this.userRepository.save(user);
  }
}
