import { cookies } from 'next/headers';

export async function getLocale() {
  const cookieStore = await cookies();
  return cookieStore.get('NEXT_LOCALE')?.value || 'en';
}
