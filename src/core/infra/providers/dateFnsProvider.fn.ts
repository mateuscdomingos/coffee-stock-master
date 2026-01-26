import { DateProvider } from '@/core/application/providers/DateProvider';
import { startOfMonth, endOfMonth } from 'date-fns';

const now = () => new Date();

const getRangeOfMonth = (date: Date): { start: Date; end: Date } => ({
  start: startOfMonth(date),
  end: endOfMonth(date),
});

export const dateFnsProvider: DateProvider = {
  now,
  getRangeOfMonth,
};
