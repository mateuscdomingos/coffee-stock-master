export type OrderStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'DELIVERED';

export interface OrderItem {
  readonly productId: string;
  readonly name: string;
  readonly quantity: number;
  readonly unitPriceInCents: number;
}

export interface OrderProps {
  readonly id: string;
  readonly items: OrderItem[];
  readonly storeId: string;
  readonly createdAt: Date;
  readonly status: OrderStatus;
  readonly employeeId: string;
}

export type Order = OrderProps;
