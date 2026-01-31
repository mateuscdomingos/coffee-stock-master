import { Store } from './Store.class';
import { Store as StoryType } from './store.types';

export interface StoreRepository {
  save(store: Store): Promise<void>;
  findById(storeId: string): Promise<Store | null>;
}

export interface StoreRepositoryFN {
  save(store: StoryType): Promise<void>;
  findById(storeId: string): Promise<StoryType | undefined>;
}
