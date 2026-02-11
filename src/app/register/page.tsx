import { BaseCard } from '@/components/auth/base-card';
import { RegisterForm } from '@/components/auth/register-form';
import { getTranslations } from 'next-intl/server';

export default async function RegisterPage() {
  const t = await getTranslations('registerPage');

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <h1 className="text-3xl font-semibold leading-tight md:text-5xl">
        {t('title')}
      </h1>
      <div className="w-full max-w-sm">
        <BaseCard description={t('description')}>
          <RegisterForm />
        </BaseCard>
      </div>
    </div>
  );
}
