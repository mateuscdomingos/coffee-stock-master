import { Hasher } from '@/core/ports/auth/Hasher';
import { UserRepository } from '@/core/ports/repositories/UserRepository';

export type AuthenticateUserDTO = {
  email: string;
  password: string;
};

export class AuthenticateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private hasher: Hasher,
  ) {}

  async execute({ email, password }: AuthenticateUserDTO) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await this.hasher.compare(
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
