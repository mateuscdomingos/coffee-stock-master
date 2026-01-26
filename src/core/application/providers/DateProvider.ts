export interface DateProvider {
  getRangeOfMonth(date: Date): { start: Date; end: Date };
  now(): Date;
}
