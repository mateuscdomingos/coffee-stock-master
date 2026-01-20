import { Store } from './Store';

describe('Store', () => {
  describe('when creating a Store', () => {
    it('should create a Store with valid properties', () => {
      const store = new Store({
        id: 'store-123',
        name: 'Main Street Coffee',
        monthlyBudgetInCents: 500000,
      });

      expect(store.props.id).toBe('store-123');
      expect(store.props.name).toBe('Main Street Coffee');
      expect(store.props.monthlyBudgetInCents).toBe(500000);
    });
  });

  describe('updateMonthlyBudgetInCents', () => {
    it('should update the monthly budget correctly', () => {
      const store = new Store({
        id: 'store-123',
        name: 'Main Street Coffee',
        monthlyBudgetInCents: 500000,
      });

      const updatedStore = store.updateMonthlyBudgetInCents(750000);

      expect(updatedStore.props.monthlyBudgetInCents).toBe(750000);
      expect(store.props.monthlyBudgetInCents).toBe(500000);
    });
  });
});
