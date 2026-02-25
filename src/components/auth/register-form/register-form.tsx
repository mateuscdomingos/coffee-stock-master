'use client';

import { handleRegister } from '@/app/actions/auth-actions';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useActionState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterInput, registerSchema } from '@/lib/schemas/auth';
import { EmailAlreadyExistsError } from '@/core/domain/Error/Error.class';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function RegisterForm() {
  const router = useRouter();
  const t = useTranslations('components.auth.registerForm');
  const [state, formAction, isPending] = useActionState(
    handleRegister,
    undefined,
  );
  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    if (state?.error) {
      Object.entries(state.error).forEach(([key, message]) => {
        form.setError(key as keyof RegisterInput, {
          type: 'server',
          message: message as string,
        });
      });
    }
  }, [state, form]);

  useEffect(() => {
    if (state?.success) {
      toast.success('User created.');
      router.push('/login');
    }
  }, [state, form, router]);

  const onSubmit = (data: RegisterInput) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));

    formAction(formData);
  };

  const getEmailMessageError = (fieldStateErrorMessage: string | undefined) => {
    const invalidPasswordError = new EmailAlreadyExistsError().message;
    if (fieldStateErrorMessage === invalidPasswordError) {
      return t('emailAlreadyExists');
    }

    return t('invalidEmail');
  };

  const getGenericMessageError = (genericErrorMessage: string) => {
    if (genericErrorMessage === 'Invalid fields. Please check your data.') {
      return t('InvalidFields');
    }

    return t('unknownError');
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">{t('fullName')}</FieldLabel>
              <Input {...field} id="name" aria-invalid={fieldState.invalid} />
              {fieldState.invalid && (
                <FieldError errors={[{ message: t('nameIsTooShort') }]} />
              )}
            </Field>
          )}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">{t('email')}</FieldLabel>
              <Input {...field} id="email" aria-invalid={fieldState.invalid} />
              {fieldState.invalid && (
                <FieldError
                  errors={[
                    {
                      message: getEmailMessageError(fieldState.error?.message),
                    },
                  ]}
                />
              )}
              <FieldDescription>{t('emailDescription')}</FieldDescription>
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password">{t('password')}</FieldLabel>
              <Input
                {...field}
                id="password"
                aria-invalid={fieldState.invalid}
                type="password"
              />
              {fieldState.invalid && (
                <FieldError errors={[{ message: t('passwordDescription') }]} />
              )}
              {!fieldState.invalid && (
                <FieldDescription>{t('passwordDescription')}</FieldDescription>
              )}
            </Field>
          )}
        />
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="confirm-password">
                {t('confirmPassword')}
              </FieldLabel>
              <Input
                {...field}
                id="confirm-password"
                aria-invalid={fieldState.invalid}
                type="password"
              />
              {fieldState.invalid && (
                <FieldError errors={[{ message: t('passwordsDoNotMatch') }]} />
              )}
              <FieldDescription>
                {t('confirmPasswordDescription')}
              </FieldDescription>
            </Field>
          )}
        />
        <FieldGroup>
          <Field>
            {state?.error?.generic && (
              <div
                role="alert"
                className="text-destructive text-sm font-normal"
              >
                {getGenericMessageError(state.error.generic)}
              </div>
            )}
            <Button type="submit" loading={isPending}>
              {t('createAccount')}
            </Button>
            <FieldDescription className="px-6 text-center">
              {t.rich('alreadyHaveAnAccount', {
                SignInLink: (chunks) => <Link href="/login">{chunks}</Link>,
              })}
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
}
