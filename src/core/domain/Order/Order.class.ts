import { OrderItem, OrderProps, OrderStatus } from './Order.types';

export class Order {
  constructor(public readonly props: OrderProps) {}

  get totalAmountInCents(): number {
    return this.props.items.reduce(
      (acc, item) => acc + item.unitPriceInCents * item.quantity,
      0,
    );
  }

  addItem(item: OrderItem): Order {
    const updatedItems = [...this.props.items, item];
    return new Order({ ...this.props, items: updatedItems });
  }

  removeItem(productId: string): Order {
    const updatedItems = this.props.items.filter(
      (item) => item.productId !== productId,
    );
    return new Order({ ...this.props, items: updatedItems });
  }

  validate(
    currentMonthSpendingInCents: number,
    storeMonthlyBudgetInCents: number,
  ): void {
    if (
      currentMonthSpendingInCents + this.totalAmountInCents >
      storeMonthlyBudgetInCents
    ) {
      throw new Error('Monthly budget exceeded');
    }
  }

  updateStatus(status: OrderStatus): Order {
    return new Order({ ...this.props, status });
  }
}
