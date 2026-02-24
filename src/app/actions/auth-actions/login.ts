'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export async function handleLogin(_: unknown, formData: FormData) {
  try {
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirectTo: '/stores',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: { generic: 'invalidCredentials' } };
    }

    throw error;
  }
}
