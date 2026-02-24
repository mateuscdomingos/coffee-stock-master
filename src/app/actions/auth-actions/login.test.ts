import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { handleLogin } from './login';

jest.mock('@/auth', () => ({
  signIn: jest.fn(),
}));

jest.mock('next-auth', () => ({
  AuthError: class AuthError extends Error {
    type: string;
    constructor(type: string) {
      super(type);
      this.name = 'AuthError';
      this.type = type;
    }
  },
}));

describe('handleLogin', () => {
  it('should call signIn with the correct credentials and redirect', async () => {
    const formData = new FormData();
    formData.append('email', 'test@example.com');
    formData.append('password', 'password123');

    await handleLogin(null, formData);

    expect(signIn).toHaveBeenCalledWith('credentials', {
      email: 'test@example.com',
      password: 'password123',
      redirectTo: '/stores',
    });
  });

  it('should return an "invalidCredentials" error when an AuthError is thrown', async () => {
    (signIn as jest.Mock).mockRejectedValue(new AuthError('CredentialsSignin'));

    const formData = new FormData();
    const result = await handleLogin(null, formData);

    expect(result).toEqual({
      error: { generic: 'invalidCredentials' },
    });
  });

  it('should throw the error if it is not an instance of AuthError', async () => {
    const redirectError = new Error('NEXT_REDIRECT');
    (signIn as jest.Mock).mockRejectedValue(redirectError);

    const formData = new FormData();

    await expect(handleLogin(null, formData)).rejects.toThrow('NEXT_REDIRECT');
  });
});
