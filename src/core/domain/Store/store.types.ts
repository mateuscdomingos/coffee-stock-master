export interface StoreProps {
  id: string;
  name: string;
  monthlyBudgetInCents: number;
  userId: string;
  createdAt?: Date;
}

export type Store = StoreProps;
