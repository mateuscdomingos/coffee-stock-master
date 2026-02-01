import { UserProps } from '@/core/domain/User/user.types';
import { createUser } from '@/core/domain/User/user.fn';
import { UserRepositoryFN } from '@/core/ports/repositories/UserRepository';
import { Hasher } from '@/core/ports/auth/Hasher';

export type RegisterUserProps = Omit<UserProps, 'passwordHash' | 'id'> & {
  password: string;
};

export const registerUserUseCase =
  (userRepository: UserRepositoryFN, hasher: Hasher) =>
  async (data: RegisterUserProps): Promise<void> => {
    const userExists = await userRepository.findByEmail(data.email);
    if (userExists) {
      throw new Error('User already exists');
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
  };
