import { BaseCard } from '@/components/auth/base-card';
import { AddProductForm } from '@/components/product/add-product-form';
import { H1 } from '@/components/ui/h1';
import { getTranslations } from 'next-intl/server';

export default async function NewProductPage() {
  const t = await getTranslations('newProductPage');

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <H1>{t('title')}</H1>
      <BaseCard description={t('description')}>
        <AddProductForm />
      </BaseCard>
    </div>
  );
}
