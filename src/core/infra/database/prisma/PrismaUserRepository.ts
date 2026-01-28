import { UserRepository } from '@/core/domain/User/UserRepository';
import { User } from '@/core/domain/User/User.class';
import { prisma } from './prisma-client';

export class PrismaUserRepository implements UserRepository {
  private prisma = prisma;

  async save(user: User): Promise<void> {
    await this.prisma.user.upsert({
      where: { id: user.props.id },
      update: {
        name: user.props.name,
        email: user.props.email,
        password: user.props.passwordHash,
      },
      create: {
        id: user.props.id,
        name: user.props.name,
        email: user.props.email,
        password: user.props.passwordHash,
        createdAt: user.props.createdAt,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const data = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!data) return null;

    return new User({
      id: data.id,
      name: data.name,
      email: data.email,
      passwordHash: data.password,
      createdAt: data.createdAt,
    });
  }

  async findById(id: string): Promise<User | null> {
    const data = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!data) return null;

    return new User({
      id: data.id,
      name: data.name,
      email: data.email,
      passwordHash: data.password,
      createdAt: data.createdAt,
    });
  }
}
