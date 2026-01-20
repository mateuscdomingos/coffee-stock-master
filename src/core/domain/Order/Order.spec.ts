import { Order } from './Order';

describe('Order', () => {
  describe('when creating a order', () => {
    it('should create a order instance', () => {
      const order = new Order({
        id: 'order-1',
        items: [],
        storeId: 'store-123',
        createdAt: new Date(),
        status: 'PENDING',
        employeeId: 'emp-456',
      });

      expect(order.props.id).toBe('order-1');
      expect(order.props.items).toEqual([]);
      expect(order.totalAmountInCents).toBe(0);
      expect(order.props.storeId).toBe('store-123');
      expect(order.props.status).toBe('PENDING');
      expect(order.props.employeeId).toBe('emp-456');
    });
  });

  describe('addItem', () => {
    it('should add an item to the order', () => {
      const order = new Order({
        id: 'order-1',
        items: [],
        storeId: 'store-123',
        createdAt: new Date(),
        status: 'PENDING',
        employeeId: 'emp-456',
      });

      const newItem = {
        productId: 'prod-1',
        name: 'Coffee Beans',
        quantity: 2,
        unitPriceInCents: 1599,
      };

      const updatedOrder = order.addItem(newItem);

      expect(updatedOrder.props.items.length).toBe(1);
      expect(updatedOrder.props.items[0]).toEqual(newItem);
      expect(updatedOrder.totalAmountInCents).toBe(3198);
    });
  });

  describe('removeItem', () => {
    it('should remove an item from the order', () => {
      const initialItem = {
        productId: 'prod-1',
        name: 'Coffee Beans',
        quantity: 2,
        unitPriceInCents: 1599,
      };

      const order = new Order({
        id: 'order-1',
        items: [initialItem],
        storeId: 'store-123',
        createdAt: new Date(),
        status: 'PENDING',
        employeeId: 'emp-456',
      });

      const updatedOrder = order.removeItem('prod-1');

      expect(updatedOrder.props.items.length).toBe(0);
      expect(updatedOrder.totalAmountInCents).toBe(0);
    });
  });

  describe('validate', () => {
    it('should throw an error if the monthly budget is exceeded', () => {
      const initialItem = {
        productId: 'prod-1',
        name: 'Coffee Beans',
        quantity: 4,
        unitPriceInCents: 1599,
      };

      const order = new Order({
        id: 'order-1',
        items: [initialItem],
        storeId: 'store-123',
        createdAt: new Date(),
        status: 'PENDING',
        employeeId: 'emp-456',
      });

      expect(() => {
        order.validate(5000, 10000);
      }).toThrow('Monthly budget exceeded');
    });
  });

  describe('updateStatus', () => {
    it('should update the order status', () => {
      const order = new Order({
        id: 'order-1',
        items: [],
        storeId: 'store-123',
        createdAt: new Date(),
        status: 'PENDING',
        employeeId: 'emp-456',
      });

      const updatedOrder = order.updateStatus('APPROVED');

      expect(updatedOrder.props.status).toBe('APPROVED');
    });
  });
});
