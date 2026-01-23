import { Store, StoreProps } from './Store.types';

const validateMonthlyBudget = (monthlyBudgetInCents: number): void => {
  if (monthlyBudgetInCents < 0) {
    throw new Error('Monthly budget cannot be negative');
  }
};

export const createStore = (props: StoreProps): Store => {
  validateMonthlyBudget(props.monthlyBudgetInCents);

  return Object.freeze({ ...props });
};

export const updateMonthlyBudgetInCents = (
  store: Store,
  budgetInCents: number,
): Store => {
  validateMonthlyBudget(budgetInCents);

  return { ...store, monthlyBudgetInCents: budgetInCents };
};
