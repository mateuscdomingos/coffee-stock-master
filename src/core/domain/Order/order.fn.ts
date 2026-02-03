import { InsufficientBudgetError } from '../Error/Error.class';
import { Order, OrderItem, OrderProps, OrderStatus } from './order.types';

export const createOrder = (props: OrderProps): Order => {
  return Object.freeze({ ...props });
};

export const getTotalAmountInCents = (order: Order): number => {
  return order.items.reduce(
    (acc, item) => acc + item.unitPriceInCents * item.quantity,
    0,
  );
};

export const addItem = (order: Order, item: OrderItem): Order => {
  const updatedItems = [...order.items, item];
  return { ...order, items: updatedItems };
};

export const removeItem = (order: Order, productId: string): Order => {
  const updatedItems = order.items.filter(
    (item) => item.productId !== productId,
  );
  return { ...order, items: updatedItems };
};

export const validateOrder = (
  order: Order,
  currentMonthSpendingInCents: number,
  storeMonthlyBudgetInCents: number,
): void => {
  if (
    currentMonthSpendingInCents + getTotalAmountInCents(order) >
    storeMonthlyBudgetInCents
  ) {
    throw new InsufficientBudgetError(
      currentMonthSpendingInCents,
      storeMonthlyBudgetInCents,
    );
  }
};

export const updateStatus = (order: Order, status: OrderStatus): Order => {
  return { ...order, status };
};
