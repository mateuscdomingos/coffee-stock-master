import { Store } from './Store.class';
import * as storeFP from './store.fn';

describe('Domain: Store', () => {
  describe('Paradigm: Object-Oriented (OOP)', () => {
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

  describe('Paradigm: Functional Programming (FP)', () => {
    describe('when creating a Store', () => {
      it('should create a Store with valid properties', () => {
        const storeProps = {
          id: 'store-123',
          name: 'Main Street Coffee',
          monthlyBudgetInCents: 500000,
        };

        const store = storeFP.createStore(storeProps);

        expect(store.id).toBe('store-123');
        expect(store.name).toBe('Main Street Coffee');
        expect(store.monthlyBudgetInCents).toBe(500000);
      });
    });

    describe('updateMonthlyBudgetInCents', () => {
      it('should update the monthly budget correctly', () => {
        const store = storeFP.createStore({
          id: 'store-123',
          name: 'Main Street Coffee',
          monthlyBudgetInCents: 500000,
        });

        const updatedStore = storeFP.updateMonthlyBudgetInCents(store, 750000);

        expect(updatedStore.monthlyBudgetInCents).toBe(750000);
        expect(store.monthlyBudgetInCents).toBe(500000);
      });
    });
  });
});
