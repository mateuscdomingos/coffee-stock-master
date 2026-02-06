import { Order } from '@/core/domain/Order/Order.class';
import { OrderRepository } from '@/core/ports/repositories/OrderRepository';
import { StoreRepository } from '@/core/ports/repositories/StoreRepository';
import { Logger } from '@/core/ports/services/Logger';
import { StoreNotFoundError } from '@/core/domain/Error/Error.class';
import { DateProvider } from '@/core/ports/services/DateProvider';

export class CreateOrderUseCase {
  constructor(
    private readonly orderRepo: OrderRepository,
    private readonly storeRepo: StoreRepository,
    private readonly dateProvider: DateProvider,
    private readonly logger: Logger,
  ) {}

  execute = async (order: Order) => {
    this.logger.info('CreateOrderUseCase', 'Initial order creation', {
      storeId: order.props.storeId,
    });
    const { start, end } = this.dateProvider.getRangeOfMonth(
      this.dateProvider.now(),
    );

    const [store, currentMonthSpendingInCents] = await Promise.all([
      this.storeRepo.findById(order.props.storeId),
      this.orderRepo.sumSpendingByStoreId(order.props.storeId, start, end),
    ]);

    if (!store) {
      this.logger.error('CreateOrderUseCase', 'Store not found', {
        storeId: order.props.storeId,
      });
      throw new StoreNotFoundError(order.props.storeId);
    }

    const spending = currentMonthSpendingInCents ?? 0;

    try {
      order.validate(spending, store.props.monthlyBudgetInCents);
    } catch (error) {
      this.logger.error('CreateOrderUseCase', 'Order validation failed', error);
      throw error;
    }

    await this.orderRepo.save(order);
    this.logger.info('CreateOrderUseCase', 'Order saved successfully', {
      orderId: order.props.id,
    });
  };
}
