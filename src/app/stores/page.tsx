import { AddButton } from '@/components/ui/button';
import { H1 } from '@/components/ui/h1';
import { getTranslations } from 'next-intl/server';

export default async function StoresPage() {
  const t = await getTranslations('storesPage');
  return (
    <div>
      <div className="flex items-center">
        <H1 className="mr-4">{t('title')}</H1>
        <AddButton href="/stores/new" title={t('addNewStore')} />
      </div>
    </div>
  );
}
