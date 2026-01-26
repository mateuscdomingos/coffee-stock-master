import { DateFnsProvider } from './DateFnsProvider.class';
import { dateFnsProvider } from './dateFnsProvider.fn';

describe('DateFnsProvider', () => {
  const date = new Date(2024, 0, 15);

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(date);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('Paradigm: Object-Oriented (OOP)', () => {
    const provider = new DateFnsProvider();

    it('should return the current date', () => {
      const now = provider.now();

      expect(now.getFullYear()).toBe(2024);
      expect(now.getMonth()).toBe(0);
      expect(now.getDate()).toBe(15);
      expect(now.getHours()).toBe(0);
    });
    it('should return the correct range for a given month', () => {
      const { start, end } = provider.getRangeOfMonth(date);

      expect(start.getFullYear()).toBe(2024);
      expect(start.getMonth()).toBe(0);
      expect(start.getDate()).toBe(1);
      expect(start.getHours()).toBe(0);

      expect(end.getFullYear()).toBe(2024);
      expect(end.getMonth()).toBe(0);
      expect(end.getDate()).toBe(31);
      expect(end.getHours()).toBe(23);
    });
  });

  describe('Paradigm: Functional Programming (FP)', () => {
    const provider = dateFnsProvider;

    it('should return the current date', () => {
      const now = provider.now();

      expect(now.getFullYear()).toBe(2024);
      expect(now.getMonth()).toBe(0);
      expect(now.getDate()).toBe(15);
      expect(now.getHours()).toBe(0);
    });
    it('should return the correct range for a given month', () => {
      const { start, end } = provider.getRangeOfMonth(date);

      expect(start.getFullYear()).toBe(2024);
      expect(start.getMonth()).toBe(0);
      expect(start.getDate()).toBe(1);
      expect(start.getHours()).toBe(0);

      expect(end.getFullYear()).toBe(2024);
      expect(end.getMonth()).toBe(0);
      expect(end.getDate()).toBe(31);
      expect(end.getHours()).toBe(23);
    });
  });
});
