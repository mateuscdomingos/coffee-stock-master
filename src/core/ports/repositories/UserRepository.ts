import { User } from '@/core/domain/User/User.class';
import { User as UserType } from '@/core/domain/User/user.types';

export interface UserRepository {
  save(user: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}

export interface UserRepositoryFN {
  save(user: UserType): Promise<void>;
  findByEmail(email: string): Promise<UserType | null>;
  findById(id: string): Promise<UserType | null>;
}
