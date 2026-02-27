import { Store } from '@/core/domain/Store/Store.class';
import { Store as StoryType } from '@/core/domain/Store/store.types';

export interface StoreRepository {
  save(store: Store): Promise<void>;
  findById(storeId: string): Promise<Store | null>;
  findAllByUserId(userId: string): Promise<Store[]>;
}

export interface StoreRepositoryFN {
  save(store: StoryType): Promise<void>;
  findById(storeId: string): Promise<StoryType | undefined>;
  findAllByUserId(userId: string): Promise<Store[]>;
}
