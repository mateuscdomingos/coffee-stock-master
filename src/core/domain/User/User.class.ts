import { InvalidEmailError } from '../Error/Error.class';
import { UserProps } from './user.types';

export class User {
  constructor(public readonly props: UserProps) {
    this.validateEmail(this.props.email);
  }

  private validateEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new InvalidEmailError();
    }
  }
}
