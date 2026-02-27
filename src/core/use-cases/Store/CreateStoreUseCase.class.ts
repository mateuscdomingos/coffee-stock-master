import { Store } from '@/core/domain/Store/Store.class';
import { StoreProps } from '@/core/domain/Store/store.types';
import { StoreRepository } from '@/core/ports/repositories/StoreRepository';
import { Logger } from '@/core/ports/services/Logger';

export type CreateStoreProps = Omit<StoreProps, 'id'>;

export class CreateStoreUseCase {
  constructor(
    private readonly storeRepository: StoreRepository,
    private readonly logger: Logger,
  ) {}

  async execute(data: CreateStoreProps) {
    this.logger.info(CreateStoreUseCase.name, 'Initial store creation', {
      name: data.name,
    });

    const store = new Store({
      id: crypto.randomUUID(),
      monthlyBudgetInCents: data.monthlyBudgetInCents,
      name: data.name,
      userId: data.userId,
    });

    this.storeRepository.save(store);
    this.logger.info(CreateStoreUseCase.name, 'Store successfully registered', {
      id: store.props.id,
      name: store.props.name,
    });
  }
}
