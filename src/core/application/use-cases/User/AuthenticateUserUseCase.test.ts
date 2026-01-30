import {
  UserRepository,
  UserRepositoryFN,
} from '@/core/domain/User/UserRepository';
import bcrypt from 'bcryptjs';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase.class';
import { User } from '@/core/domain/User/User.class';
import { User as UserType } from '@/core/domain/User/user.types';
import { authenticateUserUseCase } from './authenticateUserUseCase.fn';

describe('AuthenticateUserUseCase', () => {
  describe('Paradigm: Object-Oriented (OOP)', () => {
    describe('execute', () => {
      let userRepository: UserRepository;
      const user = new User({
        id: 'user-1',
        name: 'John Doe',
        email: 'example@example.com',
        passwordHash: bcrypt.hashSync('valid-password', 6),
      });

      beforeEach(() => {
        userRepository = {
          findByEmail: jest.fn().mockResolvedValue(user),
          findById: jest.fn(),
          save: jest.fn(),
        };
      });

      it('should authenticate a user with valid credentials', async () => {
        const useCase = new AuthenticateUserUseCase(userRepository);

        const result = await useCase.execute({
          email: 'example@example.com',
          password: 'valid-password',
        });

        expect(result).toEqual({
          id: 'user-1',
          name: 'John Doe',
          email: 'example@example.com',
        });
      });

      it('should throw an error for invalid user', async () => {
        const userRepository: UserRepository = {
          findByEmail: jest.fn().mockResolvedValue(null),
          findById: jest.fn(),
          save: jest.fn(),
        };

        const useCase = new AuthenticateUserUseCase(userRepository);

        await expect(
          useCase.execute({
            email: 'example@example.com',
            password: 'valid-password',
          }),
        ).rejects.toThrow('Invalid credentials');

        expect(userRepository.save).not.toHaveBeenCalled();
      });

      it('should throw an error for invalid password', async () => {
        const userRepository: UserRepository = {
          findByEmail: jest.fn().mockResolvedValue(user),
          findById: jest.fn(),
          save: jest.fn(),
        };

        const useCase = new AuthenticateUserUseCase(userRepository);

        await expect(
          useCase.execute({
            email: 'example@example.com',
            password: 'wrong-password',
          }),
        ).rejects.toThrow('Invalid credentials');

        expect(userRepository.save).not.toHaveBeenCalled();
      });
    });
  });

  describe('Paradigm: Functional Programming (FP)', () => {
    let userRepository: UserRepositoryFN;
    const user: UserType = {
      id: 'user-1',
      name: 'John Doe',
      email: 'example@example.com',
      passwordHash: bcrypt.hashSync('valid-password', 6),
    };

    beforeEach(() => {
      userRepository = {
        findByEmail: jest.fn().mockResolvedValue(user),
        findById: jest.fn(),
        save: jest.fn(),
      };
    });

    it('should authenticate a user with valid credentials', async () => {
      const useCase = authenticateUserUseCase(userRepository);

      const result = await useCase({
        email: 'example@example.com',
        password: 'valid-password',
      });

      expect(result).toEqual({
        id: 'user-1',
        name: 'John Doe',
        email: 'example@example.com',
      });
    });

    it('should throw an error for invalid user', async () => {
      const userRepository: UserRepositoryFN = {
        findByEmail: jest.fn().mockResolvedValue(null),
        findById: jest.fn(),
        save: jest.fn(),
      };

      const useCase = authenticateUserUseCase(userRepository);

      await expect(
        useCase({
          email: 'example@example.com',
          password: 'valid-password',
        }),
      ).rejects.toThrow('Invalid credentials');

      expect(userRepository.save).not.toHaveBeenCalled();
    });

    it('should throw an error for invalid password', async () => {
      const userRepository: UserRepositoryFN = {
        findByEmail: jest.fn().mockResolvedValue(user),
        findById: jest.fn(),
        save: jest.fn(),
      };

      const useCase = authenticateUserUseCase(userRepository);

      await expect(
        useCase({
          email: 'example@example.com',
          password: 'wrong-password',
        }),
      ).rejects.toThrow('Invalid credentials');

      expect(userRepository.save).not.toHaveBeenCalled();
    });
  });
});
