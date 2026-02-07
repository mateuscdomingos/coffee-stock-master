'use server';

import { UserAlreadyExistsError } from '@/core/domain/Error/Error.class';
import { RegisterUserUseCaseFactory } from '@/infra/factories/RegisterUserUseCaseFactory';

export async function handleRegister(_: unknown, formData: FormData) {
  const registerUser = RegisterUserUseCaseFactory.makeRegisterUserUseCase();
  const logger = RegisterUserUseCaseFactory.makeLogger();

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    await registerUser.execute({
      name,
      email,
      password,
    });
  } catch (error) {
    logger.error('auth-actions', 'Error in handleRegister:', error);
    if (error instanceof UserAlreadyExistsError) {
      return { error: error.message };
    }

    return { error: 'Unknown error' };
  }

  return { error: undefined };
}
