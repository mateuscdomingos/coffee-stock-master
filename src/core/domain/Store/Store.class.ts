import { StoreProps } from './store.types';

export class Store {
  constructor(public readonly props: StoreProps) {
    this.validateMonthlyBudget(props.monthlyBudgetInCents);
  }

  private validateMonthlyBudget(monthlyBudgetInCents: number): void {
    if (monthlyBudgetInCents < 0) {
      throw new Error('Monthly budget cannot be negative');
    }
  }

  updateMonthlyBudgetInCents(budgetInCents: number): Store {
    this.validateMonthlyBudget(budgetInCents);

    return new Store({ ...this.props, monthlyBudgetInCents: budgetInCents });
  }
}
