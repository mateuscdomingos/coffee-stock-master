import { Order } from './Order.class';
import { Order as OrderType } from './order.types';

export interface OrderRepository {
  save(order: Order): Promise<void>;
  findById(orderId: string): Promise<Order | null>;
  findAllByStoreId(storeId: string): Promise<Order[]>;
  sumSpendingByStoreId(
    storeId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<number>;
}

export interface OrderRepositoryFN {
  save(order: OrderType): Promise<void>;
  findById(orderId: string): Promise<OrderType | undefined>;
  findAllByStoreId(storeId: string): Promise<OrderType[]>;
  sumSpendingByStoreId(
    storeId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<number>;
}
