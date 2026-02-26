'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newStoreSchema, StoreInput } from '@/lib/schemas/store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
  FieldDescription,
} from '@/components/ui/field';
import { useTranslations } from 'next-intl';
import { useActionState, useEffect } from 'react';
import { formatCentsToCurrency, parseCurrencyToCents } from '@/lib/utils';
import { handleCreateStore } from '@/app/actions/store-actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function AddStoreForm() {
  const router = useRouter();
  const t = useTranslations('components.stores.addStoreForm');
  const [state, formAction, isPending] = useActionState(
    handleCreateStore,
    undefined,
  );

  const form = useForm<StoreInput>({
    resolver: zodResolver(newStoreSchema),
    defaultValues: { name: '', monthlyBudgetInCents: 0 },
  });

  const onSubmit = (data: StoreInput) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append(
      'monthlyBudgetInCents',
      data.monthlyBudgetInCents.toString(),
    );

    formAction(formData);
  };

  const getGenericMessageError = (genericErrorMessage: string) => {
    if (genericErrorMessage === 'Invalid fields. Please check your data.') {
      return t('invalidFields');
    }

    return t('unknownError');
  };

  useEffect(() => {
    if (state?.success) {
      toast.success('Store created.');
      router.push('/stores');
    }
  }, [state, form, router]);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">{t('name')}</FieldLabel>
              <Input {...field} id="name" aria-invalid={fieldState.invalid} />
              {fieldState.invalid && (
                <FieldError errors={[{ message: t('nameIsTooShort') }]} />
              )}
            </Field>
          )}
        />

        <Controller
          name="monthlyBudgetInCents"
          control={form.control}
          render={({ field: { onChange, value, ...field }, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="confirm-password">
                {t('monthlyBudget')}
              </FieldLabel>
              <Input
                {...field}
                id="confirm-password"
                aria-invalid={fieldState.invalid}
                value={formatCentsToCurrency(value)}
                onChange={(e) => {
                  const cents = parseCurrencyToCents(e.target.value);
                  onChange(cents);
                }}
              />
              {fieldState.invalid && (
                <FieldError errors={[{ message: t('invalidBudget') }]} />
              )}
              <FieldDescription>
                {t('monthlyBudgetDescription')}
              </FieldDescription>
            </Field>
          )}
        />

        <Field>
          {state?.error?.generic && (
            <div role="alert" className="text-destructive text-sm font-normal">
              {getGenericMessageError(state.error.generic)}
            </div>
          )}
          <Button type="submit" loading={isPending}>
            {t('submit')}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
