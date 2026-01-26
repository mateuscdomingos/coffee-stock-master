import { Order } from '@/core/domain/Order/Order.class';
import { OrderRepository } from '@/core/domain/Order/OrderRepository';
import { StoreRepository } from '@/core/domain/Store/StoreRepository';
import { DateProvider } from '../providers/DateProvider';

export class CreateOrderUseCase {
  constructor(
    private readonly orderRepo: OrderRepository,
    private readonly storeRepo: StoreRepository,
    private readonly dateProvider: DateProvider,
  ) {}

  execute = async (order: Order) => {
    const { start, end } = this.dateProvider.getRangeOfMonth(
      this.dateProvider.now(),
    );

    const [store, currentMonthSpendingInCents] = await Promise.all([
      this.storeRepo.findById(order.props.storeId),
      this.orderRepo.sumSpendingByStoreId(order.props.storeId, start, end),
    ]);

    if (!store) {
      throw new Error('Store not found');
    }

    const spending = currentMonthSpendingInCents ?? 0;
    order.validate(spending, store.props.monthlyBudgetInCents);

    await this.orderRepo.save(order);
  };
}
