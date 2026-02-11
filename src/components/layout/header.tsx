'use client';

import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import Link from 'next/link';

export function Header() {
  const router = useRouter();
  const locale = useLocale();

  const toggleLanguage = () => {
    const nextLocale = locale === 'en' ? 'pt' : 'en';

    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000`;

    router.refresh();
  };

  return (
    <header className="flex gap-4 p-4 border-b bg-gray-200">
      <Link href="/">Home</Link>
      <Link href="/register">Register</Link>
      <button
        onClick={toggleLanguage}
        className="px-3 py-1 bg-secondary rounded-md text-sm font-medium"
      >
        {locale === 'en' ? 'Switch to Portuguese' : 'Switch to English'}
      </button>
    </header>
  );
}
