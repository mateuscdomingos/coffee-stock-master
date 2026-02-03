import { FieldCannotBeNegative } from '../Error/Error.class';
import { Store, StoreProps } from './store.types';

const validateMonthlyBudget = (monthlyBudgetInCents: number): void => {
  if (monthlyBudgetInCents < 0) {
    throw new FieldCannotBeNegative(monthlyBudgetInCents.toString());
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
