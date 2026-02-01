import { Hasher } from '@/core/ports/auth/Hasher';
import { UserRepositoryFN } from '@/core/ports/repositories/UserRepository';

export type AuthenticateUserDTO = {
  email: string;
  password: string;
};

export const authenticateUserUseCase =
  (userRepository: UserRepositoryFN, hasher: Hasher) =>
  async ({ email, password }: AuthenticateUserDTO) => {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await hasher.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  };
