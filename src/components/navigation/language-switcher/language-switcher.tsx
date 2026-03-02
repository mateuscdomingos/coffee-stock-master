'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

export function LanguageSwitcher() {
  const t = useTranslations('components.navigation');
  const locale = useLocale();
  const router = useRouter();

  const toggleLanguage = (newLocale: string) => {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;

    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 hover:text-primary hover:bg-muted transition-colors"
          title={t('switchLanguage')}
          aria-label={t('switchLanguage')}
        >
          <Languages className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => toggleLanguage('pt')}
          className={locale === 'pt' ? 'bg-accent font-bold' : ''}
        >
          Português (BR)
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => toggleLanguage('en')}
          className={locale === 'en' ? 'bg-accent font-bold' : ''}
        >
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
