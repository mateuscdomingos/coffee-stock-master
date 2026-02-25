export interface StoreProps {
  readonly id: string;
  readonly name: string;
  readonly monthlyBudgetInCents: number;
  readonly userId: string;
}

export type Store = StoreProps;
