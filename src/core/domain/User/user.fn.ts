import { User, UserProps } from './user.types';

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email format');
  }
};

export const createUser = (props: UserProps): User => {
  validateEmail(props.email);

  return Object.freeze({ ...props });
};
