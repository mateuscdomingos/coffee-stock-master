import { Order } from '@/core/domain/Order/order.types';
import { DateProvider } from '../../providers/DateProvider';
import { validateOrder } from '@/core/domain/Order/order.fn';
import { OrderRepositoryFN } from '@/core/ports/repositories/OrderRepository';
import { StoreRepositoryFN } from '@/core/ports/repositories/StoreRepository';

export const createOrderUseCase =
  (
    orderRepo: OrderRepositoryFN,
    storeRepo: StoreRepositoryFN,
    dateProvider: DateProvider,
  ) =>
  async (order: Order) => {
    const { start, end } = dateProvider.getRangeOfMonth(dateProvider.now());

    const [store, currentMonthSpendingInCents] = await Promise.all([
      storeRepo.findById(order.storeId),
      orderRepo.sumSpendingByStoreId(order.storeId, start, end),
    ]);

    if (!store) {
      throw new Error('Store not found');
    }

    const spending = currentMonthSpendingInCents ?? 0;
    validateOrder(order, spending, store.monthlyBudgetInCents);

    await orderRepo.save(order);
  };
