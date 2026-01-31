import { Order } from '@/core/domain/Order/Order.class';
import { OrderStatus } from '@/core/domain/Order/order.types';
import { prisma } from './prisma-client';
import { OrderRepository } from '@/core/ports/repositories/OrderRepository';

export class PrismaOrderRepository implements OrderRepository {
  private prisma = prisma;

  async save(order: Order): Promise<void> {
    const { id, storeId, employeeId, status, createdAt, items } = order.props;

    const totalAmountInCents = order.totalAmountInCents;

    await this.prisma.order.create({
      data: {
        id,
        storeId,
        employeeId,
        status,
        createdAt,
        totalAmountInCents,
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            name: item.name,
            quantity: item.quantity,
            unitPriceInCents: item.unitPriceInCents,
          })),
        },
      },
    });
  }

  async sumSpendingByStoreId(
    storeId: string,
    start: Date,
    end: Date,
  ): Promise<number> {
    const result = await this.prisma.order.aggregate({
      where: {
        storeId,
        createdAt: { gte: start, lte: end },
        status: { not: 'REJECTED' },
      },
      _sum: {
        totalAmountInCents: true,
      },
    });

    return result._sum.totalAmountInCents ?? 0;
  }

  async findById(orderId: string): Promise<Order | null> {
    const data = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true, user: true },
    });

    if (!data) return null;

    return new Order({
      id: data.id,
      storeId: data.storeId,
      employeeId: data.employeeId,
      status: data.status as unknown as OrderStatus,
      createdAt: data.createdAt,
      items: data.items.map((item) => ({
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        unitPriceInCents: item.unitPriceInCents,
      })),
    });
  }

  async findAllByStoreId(storeId: string): Promise<Order[]> {
    const ordersData = await this.prisma.order.findMany({
      where: {
        storeId,
      },
      include: {
        items: true,
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return ordersData.map(
      (data) =>
        new Order({
          id: data.id,
          storeId: data.storeId,
          employeeId: data.employeeId,
          status: data.status as unknown as OrderStatus,
          createdAt: data.createdAt,
          items: data.items.map((item) => ({
            productId: item.productId,
            name: item.name,
            quantity: item.quantity,
            unitPriceInCents: item.unitPriceInCents,
          })),
        }),
    );
  }
}
