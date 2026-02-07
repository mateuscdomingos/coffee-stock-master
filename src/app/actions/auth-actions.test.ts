import { RegisterUserUseCase } from '@/core/use-cases/User/RegisterUserUseCase.class';
import { UserAlreadyExistsError } from '@/core/domain/Error/Error.class';
import { RegisterUserUseCaseFactory } from '@/infra/factories/RegisterUserUseCaseFactory';

import { handleRegister } from './auth-actions';
import { createFormData } from './test/utils/form-data-utils';

jest.mock('@/infra/factories/RegisterUserUseCaseFactory', () => ({
  RegisterUserUseCaseFactory: {
    makeRegisterUserUseCase: jest.fn(),
    makeLogger: jest.fn(() => ({ error: jest.fn() })),
  },
}));

describe('handleRegister Server Action', () => {
  let mockExecute: jest.Mock;

  beforeEach(() => {
    mockExecute = jest.fn();

    jest
      .spyOn(RegisterUserUseCaseFactory, 'makeRegisterUserUseCase')
      .mockReturnValue({
        execute: mockExecute,
      } as unknown as jest.Mocked<RegisterUserUseCase>);
  });

  it('should return undefined error on success', async () => {
    const formData = createFormData({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    });

    const result = await handleRegister(undefined, formData);

    expect(result).toEqual({ error: undefined });
    expect(mockExecute).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    });
  });

  describe('when user already exists', () => {
    it('should return UserAlreadyExistsError message', async () => {
      const domainError = new UserAlreadyExistsError();
      mockExecute.mockRejectedValue(domainError);

      const formData = createFormData({ email: 'john@example.com' });

      const result = await handleRegister(undefined, formData);
      expect(result).toEqual({ error: domainError.message });
    });
  });

  describe('when throws an unexpected error', () => {
    it('should return "Unknown error"', async () => {
      mockExecute.mockRejectedValue(new Error('Unexpected error'));
      const formData = createFormData({ email: 'any@email.com' });

      const result = await handleRegister(null, formData);
      expect(result).toEqual({ error: 'Unknown error' });
    });
  });
});
