import { DateProvider } from '@/core/application/providers/DateProvider';
import { startOfMonth, endOfMonth } from 'date-fns';

export class DateFnsProvider implements DateProvider {
  now(): Date {
    return new Date();
  }

  getRangeOfMonth(date: Date): { start: Date; end: Date } {
    return {
      start: startOfMonth(date),
      end: endOfMonth(date),
    };
  }
}
