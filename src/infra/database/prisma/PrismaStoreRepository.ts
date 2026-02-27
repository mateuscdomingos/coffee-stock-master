import { Store } from '@/core/domain/Store/Store.class';
import { StoreRepository } from '@/core/ports/repositories/StoreRepository';
import { prisma } from './prisma-client';

export class PrismaStoreRepository implements StoreRepository {
  private prisma = prisma;

  async save(store: Store): Promise<void> {
    await this.prisma.store.upsert({
      where: { id: store.props.id },
      update: {
        monthlyBudgetInCents: store.props.monthlyBudgetInCents,
        name: store.props.name,
      },
      create: {
        id: store.props.id,
        monthlyBudgetInCents: store.props.monthlyBudgetInCents,
        name: store.props.name,
        userId: store.props.userId,
      },
    });
  }

  async findById(id: string): Promise<Store | null> {
    const data = await this.prisma.store.findUnique({
      where: { id },
    });

    if (!data) return null;

    return new Store({
      id: data.id,
      monthlyBudgetInCents: data.monthlyBudgetInCents,
      name: data.name,
      userId: data.userId,
      createdAt: data.createdAt,
    });
  }

  async findAllByUserId(userId: string): Promise<Store[]> {
    const storesData = await this.prisma.store.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
    });

    return storesData.map((data) => {
      return new Store({
        id: data.id,
        monthlyBudgetInCents: data.monthlyBudgetInCents,
        name: data.name,
        userId: data.userId,
        createdAt: data.createdAt,
      });
    });
  }
}
