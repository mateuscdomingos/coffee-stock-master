export interface StoreProps {
  readonly id: string;
  readonly name: string;
  readonly monthlyBudgetInCents: number;
}

export type Store = StoreProps;
