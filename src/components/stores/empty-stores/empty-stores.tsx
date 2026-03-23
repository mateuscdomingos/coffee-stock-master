import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export async function EmptyStores() {
  const t = await getTranslations('storesPage');

  return (
    <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-xl bg-muted/30">
      <h2 className="text-xl font-semibold mb-2">{t('noStoresFound')}</h2>
      <p className="text-muted-foreground mb-2 text-center max-w-sm">
        {t('noStoresDescription')}
      </p>
      <Link href="/stores/new">{t('addNewStore')}</Link>
    </div>
  );
}
