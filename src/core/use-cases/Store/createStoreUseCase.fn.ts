import { StoreRepository } from '@/core/ports/repositories/StoreRepository';
import { CreateStoreProps } from './CreateStoreUseCase.class';
import { Logger } from '@/core/ports/services/Logger';
import { Store } from '@/core/domain/Store/Store.class';

export const createStoreUseCase =
  (storeRepository: StoreRepository, logger: Logger) =>
  async (data: CreateStoreProps): Promise<void> => {
    logger.info('createStoreUseCase', 'Initial store creation', {
      name: data.name,
    });

    const store = new Store({
      id: crypto.randomUUID(),
      monthlyBudgetInCents: data.monthlyBudgetInCents,
      name: data.name,
      userId: data.userId,
    });

    await storeRepository.save(store);

    logger.info('createStoreUseCase', 'Store successfully registered', {
      id: store.props.id,
      name: store.props.name,
    });
  };
