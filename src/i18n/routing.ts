import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
import en from '../messages/en.json';

export const routing = defineRouting({
  locales: ['en'], // locales: ['en', 'pt'],
  defaultLocale: 'en',
  localePrefix: 'never',
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);

type Messages = typeof en;
declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface IntlMessages extends Messages {}
}
