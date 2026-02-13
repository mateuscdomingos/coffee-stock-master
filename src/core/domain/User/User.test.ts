import { User } from './User.class';
import { createUser } from './user.fn';

describe('Domain: User', () => {
  describe('Paradigm: Object-Oriented (OOP)', () => {
    describe('when creating a User', () => {
      it('should create a User with valid properties', () => {
        const user = new User({
          id: 'user-123',
          name: 'Mateus Domingos',
          email: 'john.doe@example.com',
          passwordHash: 'hashed-password',
        });

        expect(user.props.id).toBe('user-123');
        expect(user.props.name).toBe('Mateus Domingos');
        expect(user.props.email).toBe('john.doe@example.com');
        expect(user.props.passwordHash).toBe('hashed-password');
      });

      it('should throw an error for invalid email format', () => {
        expect(() => {
          new User({
            id: 'user-123',
            name: 'Mateus Domingos',
            email: 'invalid-email',
            passwordHash: 'hashed-password',
          });
        }).toThrow('Invalid email format');
      });
    });
  });

  describe('Paradigm: Functional Programming (FP)', () => {
    describe('when creating a User', () => {
      it('should create a User with valid properties', () => {
        const userProps = {
          id: 'user-123',
          name: 'Mateus Domingos',
          email: 'john.doe@example.com',
          passwordHash: 'hashed-password',
        };

        const user = createUser(userProps);

        expect(user.id).toBe('user-123');
        expect(user.name).toBe('Mateus Domingos');
        expect(user.email).toBe('john.doe@example.com');
        expect(user.passwordHash).toBe('hashed-password');
      });

      it('should throw an error for invalid email format', () => {
        expect(() => {
          createUser({
            id: 'user-123',
            name: 'Mateus Domingos',
            email: 'invalid-email',
            passwordHash: 'hashed-password',
          });
        }).toThrow('Invalid email format');
      });
    });
  });
});
