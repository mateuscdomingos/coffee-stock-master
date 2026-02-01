import { Order } from '@/core/domain/Order/order.types';
import { DateProvider } from '../../providers/DateProvider';
import { validateOrder } from '@/core/domain/Order/order.fn';
import { OrderRepositoryFN } from '@/core/ports/repositories/OrderRepository';
import { StoreRepositoryFN } from '@/core/ports/repositories/StoreRepository';
import { Logger } from '@/core/ports/services/Logger';

export const createOrderUseCase =
  (
    orderRepo: OrderRepositoryFN,
    storeRepo: StoreRepositoryFN,
    dateProvider: DateProvider,
    logger: Logger,
  ) =>
  async (order: Order) => {
    logger.info('CreateOrderUseCase', 'Initial order creation', {
      storeId: order.storeId,
    });
    const { start, end } = dateProvider.getRangeOfMonth(dateProvider.now());

    const [store, currentMonthSpendingInCents] = await Promise.all([
      storeRepo.findById(order.storeId),
      orderRepo.sumSpendingByStoreId(order.storeId, start, end),
    ]);

    if (!store) {
      logger.error('CreateOrderUseCase', 'Store not found', {
        storeId: order.storeId,
      });
      throw new Error('Store not found');
    }

    const spending = currentMonthSpendingInCents ?? 0;

    try {
      validateOrder(order, spending, store.monthlyBudgetInCents);
    } catch (error) {
      logger.error('CreateOrderUseCase', 'Order validation failed', error);
      throw error;
    }

    await orderRepo.save(order);
    logger.info('CreateOrderUseCase', 'Order saved successfully', {
      orderId: order.id,
    });
  };
