import {
  UserRepository,
  UserRepositoryFN,
} from '@/core/ports/repositories/UserRepository';
import { RegisterUserUseCase } from './RegisterUserUseCase.class';
import { User } from '@/core/domain/User/User.class';
import bcrypt from 'bcryptjs';
import { registerUserUseCase } from './registerUserUseCase.fn';
import { Hasher } from '@/core/ports/services/Hasher';
import { Logger } from '@/core/ports/services/Logger';
import { EmailAlreadyExistsError } from '@/core/domain/Error/Error.class';

describe('RegisterUserUseCase', () => {
  const logger: Logger = {
    error: jest.fn(),
    info: jest.fn(),
  };
  describe('Paradigm: Object-Oriented (OOP)', () => {
    describe('execute', () => {
      let userRepository: UserRepository;
      let hasher: Hasher;

      beforeEach(() => {
        userRepository = {
          findByEmail: jest.fn().mockResolvedValue(null),
          findById: jest.fn(),
          save: jest.fn(),
        };
        hasher = {
          compare: jest.fn(),
          hash: jest.fn().mockResolvedValue('password'),
        };
      });

      it('should register a new user', async () => {
        const useCase = new RegisterUserUseCase(userRepository, hasher, logger);

        await useCase.execute({
          name: 'Jane Doe',
          email: 'example@example.com',
          password: 'valid-password',
        });

        expect(hasher.hash).toHaveBeenCalledWith('valid-password');

        expect(userRepository.save).toHaveBeenCalled();
      });

      it('should throw an error if email is already in use', async () => {
        const user = new User({
          id: 'user-1',
          name: 'Mateus Domingos',
          email: 'example@example.com',
          passwordHash: bcrypt.hashSync('valid-password', 6),
        });
        const userRepository: UserRepository = {
          findByEmail: jest.fn().mockResolvedValue(user),
          findById: jest.fn(),
          save: jest.fn(),
        };

        const useCase = new RegisterUserUseCase(userRepository, hasher, logger);

        await expect(
          useCase.execute({
            name: 'Jane Doe',
            email: 'example@example.com',
            password: 'valid-password',
          }),
        ).rejects.toBeInstanceOf(EmailAlreadyExistsError);

        expect(userRepository.save).not.toHaveBeenCalled();
      });
    });
  });

  describe('Paradigm: Functional Programming (FP)', () => {
    let userRepository: UserRepositoryFN;
    let hasher: Hasher;

    beforeEach(() => {
      userRepository = {
        findByEmail: jest.fn().mockResolvedValue(null),
        findById: jest.fn(),
        save: jest.fn(),
      };
      hasher = {
        compare: jest.fn(),
        hash: jest.fn().mockResolvedValue('password'),
      };
    });

    it('should register a new user', async () => {
      const useCase = registerUserUseCase(userRepository, hasher, logger);

      await useCase({
        name: 'Jane Doe',
        email: 'example@example.com',
        password: 'valid-password',
      });

      expect(userRepository.save).toHaveBeenCalled();
    });

    it('should throw an error if email is already in use', async () => {
      const user = {
        id: 'user-1',
        name: 'Mateus Domingos',
        email: 'example@example.com',
        passwordHash: bcrypt.hashSync('valid-password', 6),
      };
      const userRepository: UserRepositoryFN = {
        findByEmail: jest.fn().mockResolvedValue(user),
        findById: jest.fn(),
        save: jest.fn(),
      };

      const useCase = registerUserUseCase(userRepository, hasher, logger);

      await expect(
        useCase({
          name: 'Jane Doe',
          email: 'example@example.com',
          password: 'valid-password',
        }),
      ).rejects.toBeInstanceOf(EmailAlreadyExistsError);

      expect(userRepository.save).not.toHaveBeenCalled();
    });
  });
});
