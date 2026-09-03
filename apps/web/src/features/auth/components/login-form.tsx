'use client';

import { triggerAuthChange } from '@/lib/use-auth-status';
import { Alert, Button, Field, Fieldset, Input, Stack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from '@/i18n/navigation';
import { apiFetch, getErrorMessage, setStoredAuthSession } from '@lib/auth';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type LoginFormData = { email: string; password: string };

export function LoginForm() {
  const router = useRouter();
  const t = useTranslations('LoginForm');
  const [serverError, setServerError] = useState<string | null>(null);

  const loginSchema = useMemo(
    () =>
      z.object({
        email: z.string().min(1, t('emailRequired')).email(t('emailInvalid')),
        password: z.string().min(6, t('passwordMin')),
      }),
    [t],
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (values: LoginFormData) => {
    setServerError(null);

    try {
      const res = await apiFetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(getErrorMessage(data, t('failed')));
      }

      setStoredAuthSession(true);
      triggerAuthChange();
      router.push('/');
    } catch (err) {
      setServerError(err instanceof Error ? err.message : t('failed'));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Fieldset.Root size="lg">
        <Stack gap="4">
          {serverError && (
            <Alert.Root status="error" borderRadius="l2">
              <Alert.Indicator />
              <Alert.Title>{serverError}</Alert.Title>
            </Alert.Root>
          )}

          <Field.Root invalid={!!errors.email}>
            <Field.Label>{t('emailLabel')}</Field.Label>
            <Input type="email" placeholder={t('emailPlaceholder')} {...register('email')} />
            <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.password}>
            <Field.Label>{t('passwordLabel')}</Field.Label>
            <Input type="password" placeholder="••••••••" {...register('password')} />
            <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
          </Field.Root>

          <Button
            type="submit"
            colorPalette="teal"
            variant="solid"
            width="full"
            loading={isSubmitting}
            loadingText={t('signingIn')}
            mt="2"
          >
            {t('signIn')}
          </Button>
        </Stack>
      </Fieldset.Root>
    </form>
  );
}
