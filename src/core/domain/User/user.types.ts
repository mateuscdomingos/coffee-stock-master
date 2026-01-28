export type UserProps = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt?: Date;
};

export type User = UserProps;
