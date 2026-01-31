import {
  UserRepository,
  UserRepositoryFN,
} from '@/core/ports/repositories/UserRepository';
import { RegisterUserUseCase } from './RegisterUserUseCase.class';
import { User } from '@/core/domain/User/User.class';
import bcrypt from 'bcryptjs';
import { registerUserUseCase } from './registerUserUseCase.fn';

describe('RegisterUserUseCase', () => {
  describe('Paradigm: Object-Oriented (OOP)', () => {
    describe('execute', () => {
      let userRepository: UserRepository;

      beforeEach(() => {
        userRepository = {
          findByEmail: jest.fn().mockResolvedValue(null),
          findById: jest.fn(),
          save: jest.fn(),
        };
      });

      it('should register a new user', async () => {
        const useCase = new RegisterUserUseCase(userRepository);

        await useCase.execute({
          name: 'Jane Doe',
          email: 'example@example.com',
          password: 'valid-password',
        });
        expect(userRepository.save).toHaveBeenCalled();
      });

      it('should throw an error if email is already in use', async () => {
        const user = new User({
          id: 'user-1',
          name: 'John Doe',
          email: 'example@example.com',
          passwordHash: bcrypt.hashSync('valid-password', 6),
        });
        const userRepository: UserRepository = {
          findByEmail: jest.fn().mockResolvedValue(user),
          findById: jest.fn(),
          save: jest.fn(),
        };

        const useCase = new RegisterUserUseCase(userRepository);

        await expect(
          useCase.execute({
            name: 'Jane Doe',
            email: 'example@example.com',
            password: 'valid-password',
          }),
        ).rejects.toThrow('User already exists');

        expect(userRepository.save).not.toHaveBeenCalled();
      });
    });
  });

  describe('Paradigm: Functional Programming (FP)', () => {
    let userRepository: UserRepositoryFN;

    beforeEach(() => {
      userRepository = {
        findByEmail: jest.fn().mockResolvedValue(null),
        findById: jest.fn(),
        save: jest.fn(),
      };
    });

    it('should register a new user', async () => {
      const useCase = registerUserUseCase(userRepository);

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
        name: 'John Doe',
        email: 'example@example.com',
        passwordHash: bcrypt.hashSync('valid-password', 6),
      };
      const userRepository: UserRepositoryFN = {
        findByEmail: jest.fn().mockResolvedValue(user),
        findById: jest.fn(),
        save: jest.fn(),
      };

      const useCase = registerUserUseCase(userRepository);

      await expect(
        useCase({
          name: 'Jane Doe',
          email: 'example@example.com',
          password: 'valid-password',
        }),
      ).rejects.toThrow('User already exists');

      expect(userRepository.save).not.toHaveBeenCalled();
    });
  });
});
