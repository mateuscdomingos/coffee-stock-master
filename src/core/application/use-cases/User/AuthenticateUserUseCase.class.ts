import { UserRepository } from '@/core/domain/User/UserRepository';
import bcrypt from 'bcryptjs';

export type AuthenticateUserDTO = {
  email: string;
  password: string;
};

export class AuthenticateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, password }: AuthenticateUserDTO) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.props.passwordHash,
    );

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    return {
      id: user.props.id,
      name: user.props.name,
      email: user.props.email,
    };
  }
}
