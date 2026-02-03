import {
  OrderRepository,
  OrderRepositoryFN,
} from '@/core/ports/repositories/OrderRepository';
import { CreateOrderUseCase } from './CreateOrderUseCase.class';
import {
  StoreRepository,
  StoreRepositoryFN,
} from '@/core/ports/repositories/StoreRepository';
import { DateProvider } from '../../providers/DateProvider';
import { Order } from '@/core/domain/Order/Order.class';
import { createOrderUseCase } from './createOrderUseCase.fn';
import * as orderFP from '@/core/domain/Order/order.fn';
import { Logger } from '@/core/ports/services/Logger';
import { StoreNotFoundError } from '@/core/domain/Error/Error.class';

describe('CreateOrderUseCase', () => {
  describe('Paradigm: Object-Oriented (OOP)', () => {
    describe('execute', () => {
      let orderRepo: OrderRepository;
      let storeRepo: StoreRepository;
      let dateProvider: DateProvider;
      let logger: Logger;

      beforeEach(() => {
        orderRepo = {
          sumSpendingByStoreId: jest.fn().mockResolvedValue(5000),
          findAllByStoreId: jest.fn(),
          findById: jest.fn(),
          save: jest.fn(),
        };
        storeRepo = {
          findById: jest.fn().mockResolvedValue({
            props: { monthlyBudgetInCents: 10000 },
          }),
          save: jest.fn(),
        };
        dateProvider = {
          getRangeOfMonth: jest
            .fn()
            .mockReturnValue({ start: new Date(), end: new Date() }),
          now: jest.fn(),
        };
        logger = {
          error: jest.fn(),
          info: jest.fn(),
        };
      });

      it('should create an order', async () => {
        const useCase = new CreateOrderUseCase(
          orderRepo,
          storeRepo,
          dateProvider,
          logger,
        );

        const orderItem = {
          productId: 'prod-1',
          name: 'Coffee Beans',
          quantity: 2,
          unitPriceInCents: 1599,
        };

        const order = new Order({
          id: 'order-1',
          items: [orderItem],
          storeId: 'store-123',
          createdAt: new Date(),
          status: 'PENDING',
          employeeId: 'emp-456',
        });
        const validateSpy = jest.spyOn(order, 'validate');

        await useCase.execute(order);

        expect(validateSpy).toHaveBeenCalledWith(5000, 10000);
        expect(orderRepo.save).toHaveBeenCalledWith(order);
      });

      describe('when store does not exists', () => {
        it('should not allow creating an order', async () => {
          const storeRepo: StoreRepository = {
            findById: jest.fn().mockResolvedValue(null),
            save: jest.fn(),
          };

          const useCase = new CreateOrderUseCase(
            orderRepo,
            storeRepo,
            dateProvider,
            logger,
          );

          const order = new Order({
            id: 'order-1',
            items: [],
            storeId: 'store-123',
            createdAt: new Date(),
            status: 'PENDING',
            employeeId: 'emp-456',
          });

          await expect(useCase.execute(order)).rejects.toBeInstanceOf(
            StoreNotFoundError,
          );
        });
      });
    });
  });

  describe('Paradigm: Functional Programming (FP)', () => {
    let orderRepo: OrderRepositoryFN;
    let storeRepo: StoreRepositoryFN;
    let dateProvider: DateProvider;
    let logger: Logger;

    beforeEach(() => {
      orderRepo = {
        sumSpendingByStoreId: jest.fn().mockResolvedValue(5000),
        findAllByStoreId: jest.fn(),
        findById: jest.fn(),
        save: jest.fn(),
      };
      storeRepo = {
        findById: jest.fn().mockResolvedValue({
          monthlyBudgetInCents: 10000,
        }),
        save: jest.fn(),
      };
      dateProvider = {
        getRangeOfMonth: jest
          .fn()
          .mockReturnValue({ start: new Date(), end: new Date() }),
        now: jest.fn(),
      };
      logger = {
        error: jest.fn(),
        info: jest.fn(),
      };
    });

    it('should create an order', async () => {
      const useCase = createOrderUseCase(
        orderRepo,
        storeRepo,
        dateProvider,
        logger,
      );

      const orderItem = {
        productId: 'prod-1',
        name: 'Coffee Beans',
        quantity: 2,
        unitPriceInCents: 1599,
      };

      const order = orderFP.createOrder({
        id: 'order-1',
        items: [orderItem],
        storeId: 'store-123',
        createdAt: new Date(),
        status: 'PENDING',
        employeeId: 'emp-456',
      });

      await useCase(order);

      expect(dateProvider.getRangeOfMonth).toHaveBeenCalledWith(
        dateProvider.now(),
      );

      expect(orderRepo.save).toHaveBeenCalledWith(order);
    });

    describe('when store does not exists', () => {
      it('should not allow creating an order', async () => {
        const storeRepo: StoreRepositoryFN = {
          findById: jest.fn().mockResolvedValue(undefined),
          save: jest.fn(),
        };

        const useCase = createOrderUseCase(
          orderRepo,
          storeRepo,
          dateProvider,
          logger,
        );

        const orderItem = {
          productId: 'prod-1',
          name: 'Coffee Beans',
          quantity: 2,
          unitPriceInCents: 1599,
        };

        const order = orderFP.createOrder({
          id: 'order-1',
          items: [orderItem],
          storeId: 'store-123',
          createdAt: new Date(),
          status: 'PENDING',
          employeeId: 'emp-456',
        });

        await expect(useCase(order)).rejects.toBeInstanceOf(StoreNotFoundError);
      });
    });
  });
});
