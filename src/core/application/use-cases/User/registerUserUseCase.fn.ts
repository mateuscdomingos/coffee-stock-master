import { UserRepositoryFN } from '@/core/domain/User/UserRepository';
import { UserProps } from '@/core/domain/User/user.types';
import { createUser } from '@/core/domain/User/user.fn';
import bcrypt from 'bcryptjs';

export type RegisterUserDTO = Omit<UserProps, 'passwordHash'> & {
  password: string;
};

export const registerUserUseCase =
  (userRepository: UserRepositoryFN) =>
  async (data: RegisterUserDTO): Promise<void> => {
    const userExists = await userRepository.findByEmail(data.email);
    if (userExists) {
      throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(6);
    const passwordHash = await bcrypt.hash(data.password, salt);

    const user = createUser({
      id: data.id,
      name: data.name,
      email: data.email,
      passwordHash,
      createdAt: data.createdAt ?? new Date(),
    });

    await userRepository.save(user);
  };
