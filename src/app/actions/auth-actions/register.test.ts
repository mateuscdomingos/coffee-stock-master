import { RegisterUserUseCase } from '@/core/use-cases/User/RegisterUserUseCase.class';
import { EmailAlreadyExistsError } from '@/core/domain/Error/Error.class';
import { RegisterUserUseCaseFactory } from '@/infra/factories/RegisterUserUseCaseFactory';

import { handleRegister } from './register';
import { createFormData } from '../test/utils/form-data-utils';

jest.mock('@/infra/factories/RegisterUserUseCaseFactory', () => ({
  RegisterUserUseCaseFactory: {
    makeRegisterUserUseCase: jest.fn(),
    makeLogger: jest.fn(() => ({ error: jest.fn() })),
  },
}));

describe('handleRegister Server Action', () => {
  let mockExecute: jest.Mock;
  const formData = createFormData({
    name: 'Mateus Domingos',
    email: 'mateus@example.com',
    password: 'password123',
    confirmPassword: 'password123',
  });

  beforeEach(() => {
    mockExecute = jest.fn();

    jest
      .spyOn(RegisterUserUseCaseFactory, 'makeRegisterUserUseCase')
      .mockReturnValue({
        execute: mockExecute,
      } as unknown as jest.Mocked<RegisterUserUseCase>);
  });

  it('should return success on success', async () => {
    const result = await handleRegister(undefined, formData);

    expect(result).toEqual({ success: true });
    expect(mockExecute).toHaveBeenCalledWith({
      name: 'Mateus Domingos',
      email: 'mateus@example.com',
      password: 'password123',
    });
  });

  describe('when invalid fields', () => {
    it('should return invalid fields message', async () => {
      const formData = createFormData({
        name: 'Mateus Domingos',
      });

      const result = await handleRegister(undefined, formData);
      expect(result).toEqual({
        error: { generic: 'Invalid fields. Please check your data.' },
      });
    });
  });

  describe('when user already exists', () => {
    it('should return EmailAlreadyExistsError message', async () => {
      const domainError = new EmailAlreadyExistsError();
      mockExecute.mockRejectedValue(domainError);

      const result = await handleRegister(undefined, formData);
      expect(result).toEqual({ error: { email: domainError.message } });
    });
  });

  describe('when throws an unexpected error', () => {
    it('should return "Unknown error"', async () => {
      mockExecute.mockRejectedValue(new Error('Unexpected error'));

      const result = await handleRegister(null, formData);
      expect(result).toEqual({ error: { generic: 'Unknown error' } });
    });
  });
});
