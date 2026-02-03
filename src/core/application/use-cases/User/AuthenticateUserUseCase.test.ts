import {
  UserRepository,
  UserRepositoryFN,
} from '@/core/ports/repositories/UserRepository';
import bcrypt from 'bcryptjs';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase.class';
import { User } from '@/core/domain/User/User.class';
import { User as UserType } from '@/core/domain/User/user.types';
import { authenticateUserUseCase } from './authenticateUserUseCase.fn';
import { Hasher } from '@/core/ports/auth/Hasher';
import { Logger } from '@/core/ports/services/Logger';
import { InvalidCredentialsError } from '@/core/domain/Error/Error.class';

describe('AuthenticateUserUseCase', () => {
  const logger: Logger = {
    error: jest.fn(),
    info: jest.fn(),
  };
  describe('Paradigm: Object-Oriented (OOP)', () => {
    describe('execute', () => {
      let userRepository: UserRepository;
      let hasher: Hasher;
      const user = new User({
        id: 'user-1',
        name: 'John Doe',
        email: 'example@example.com',
        passwordHash: 'passwordHash',
      });

      beforeEach(() => {
        userRepository = {
          findByEmail: jest.fn().mockResolvedValue(user),
          findById: jest.fn(),
          save: jest.fn(),
        };
        hasher = {
          compare: jest.fn().mockResolvedValue(true),
          hash: jest.fn(),
        };
      });

      it('should authenticate a user with valid credentials', async () => {
        const useCase = new AuthenticateUserUseCase(
          userRepository,
          hasher,
          logger,
        );

        const result = await useCase.execute({
          email: 'example@example.com',
          password: 'valid-password',
        });

        expect(hasher.compare).toHaveBeenCalledWith(
          'valid-password',
          user.props.passwordHash,
        );

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

        const useCase = new AuthenticateUserUseCase(
          userRepository,
          hasher,
          logger,
        );

        await expect(
          useCase.execute({
            email: 'example@example.com',
            password: 'valid-password',
          }),
        ).rejects.toBeInstanceOf(InvalidCredentialsError);

        expect(userRepository.save).not.toHaveBeenCalled();
      });

      it('should throw an error for invalid password', async () => {
        const hasher = {
          compare: jest.fn().mockResolvedValue(false),
          hash: jest.fn(),
        };
        const userRepository: UserRepository = {
          findByEmail: jest.fn().mockResolvedValue(user),
          findById: jest.fn(),
          save: jest.fn(),
        };

        const useCase = new AuthenticateUserUseCase(
          userRepository,
          hasher,
          logger,
        );

        await expect(
          useCase.execute({
            email: 'example@example.com',
            password: 'wrong-password',
          }),
        ).rejects.toBeInstanceOf(InvalidCredentialsError);

        expect(userRepository.save).not.toHaveBeenCalled();
      });
    });
  });

  describe('Paradigm: Functional Programming (FP)', () => {
    let hasher: Hasher;
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
      hasher = {
        compare: jest.fn().mockResolvedValue(true),
        hash: jest.fn(),
      };
    });

    it('should authenticate a user with valid credentials', async () => {
      const useCase = authenticateUserUseCase(userRepository, hasher, logger);

      const result = await useCase({
        email: 'example@example.com',
        password: 'valid-password',
      });

      expect(hasher.compare).toHaveBeenCalledWith(
        'valid-password',
        user.passwordHash,
      );

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

      const useCase = authenticateUserUseCase(userRepository, hasher, logger);

      await expect(
        useCase({
          email: 'example@example.com',
          password: 'valid-password',
        }),
      ).rejects.toBeInstanceOf(InvalidCredentialsError);

      expect(userRepository.save).not.toHaveBeenCalled();
    });

    it('should throw an error for invalid password', async () => {
      const userRepository: UserRepositoryFN = {
        findByEmail: jest.fn().mockResolvedValue(user),
        findById: jest.fn(),
        save: jest.fn(),
      };
      const hasher = {
        compare: jest.fn().mockResolvedValue(false),
        hash: jest.fn(),
      };

      const useCase = authenticateUserUseCase(userRepository, hasher, logger);

      await expect(
        useCase({
          email: 'example@example.com',
          password: 'wrong-password',
        }),
      ).rejects.toBeInstanceOf(InvalidCredentialsError);

      expect(userRepository.save).not.toHaveBeenCalled();
    });
  });
});
