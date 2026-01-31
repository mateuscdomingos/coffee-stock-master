import { UserProps } from '@/core/domain/User/user.types';
import { createUser } from '@/core/domain/User/user.fn';
import bcrypt from 'bcryptjs';
import { UserRepositoryFN } from '@/core/ports/repositories/UserRepository';

export type RegisterUserProps = Omit<UserProps, 'passwordHash' | 'id'> & {
  password: string;
};

export const registerUserUseCase =
  (userRepository: UserRepositoryFN) =>
  async (data: RegisterUserProps): Promise<void> => {
    const userExists = await userRepository.findByEmail(data.email);
    if (userExists) {
      throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(6);
    const passwordHash = await bcrypt.hash(data.password, salt);

    const user = createUser({
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      passwordHash,
      createdAt: data.createdAt ?? new Date(),
    });

    await userRepository.save(user);
  };
