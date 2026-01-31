import { UserRepositoryFN } from '@/core/ports/repositories/UserRepository';
import bcrypt from 'bcryptjs';

export type AuthenticateUserDTO = {
  email: string;
  password: string;
};

export const authenticateUserUseCase =
  (userRepository: UserRepositoryFN) =>
  async ({ email, password }: AuthenticateUserDTO) => {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  };
