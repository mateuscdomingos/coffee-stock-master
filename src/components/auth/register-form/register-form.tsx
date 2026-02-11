'use client';

import { handleRegister } from '@/app/actions/auth-actions';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useActionState } from 'react';

export function RegisterForm() {
  const t = useTranslations('components.auth.registerForm');
  const [state, formAction] = useActionState(handleRegister, undefined);

  return (
    <form action={formAction}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">{t('fullName')}</FieldLabel>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">{t('email')}</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
          />
          <FieldDescription>{t('emailDescription')}</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="password">{t('password')}</FieldLabel>
          <Input id="password" name="password" type="password" required />
          <FieldDescription>{t('passwordDescription')}</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">
            {t('confirmPassword')}
          </FieldLabel>
          <Input
            id="confirm-password"
            name="confirmPassword"
            type="password"
            required
          />
          <FieldDescription>{t('confirmPasswordDescription')}</FieldDescription>
        </Field>
        {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
        <FieldGroup>
          <Field>
            <Button type="submit">{t('createAccount')}</Button>
            <FieldDescription className="px-6 text-center">
              {t.rich('alreadyHaveAnAccount', {
                SignInLink: (chunks) => <Link href="/">{chunks}</Link>,
              })}
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
}
