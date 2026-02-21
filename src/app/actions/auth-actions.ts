'use server';

import { EmailAlreadyExistsError } from '@/core/domain/Error/Error.class';
import { RegisterUserUseCaseFactory } from '@/infra/factories/RegisterUserUseCaseFactory';
import { registerSchema } from '@/lib/schemas/auth';

export async function handleRegister(_: unknown, formData: FormData) {
  const registerUser = RegisterUserUseCaseFactory.makeRegisterUserUseCase();
  const logger = RegisterUserUseCaseFactory.makeLogger();

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  const validatedFields = registerSchema.safeParse({
    name,
    email,
    password,
    confirmPassword,
  });

  if (!validatedFields.success) {
    return {
      error: { generic: 'Invalid fields. Please check your data.' },
    };
  }

  try {
    await registerUser.execute({
      name,
      email,
      password,
    });
  } catch (error) {
    logger.error('auth-actions', 'Error in handleRegister:', error);
    if (error instanceof EmailAlreadyExistsError) {
      return { error: { email: error.message } };
    }

    return { error: { generic: 'Unknown error' } };
  }

  return { error: undefined };
}
