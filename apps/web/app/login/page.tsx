'use client';

import { Alert, Button, Field, Fieldset, Input, Stack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { apiFetch, getErrorMessage } from '../../lib/auth';
import { AuthLayout } from '../auth-layout/auth-layout';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

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
        throw new Error(getErrorMessage(data, 'Login failed'));
      }

      router.push('/profile');
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  return (
    <AuthLayout
      title="Login"
      footerText="You don't have an account?"
      footerLinkText="Register"
      footerLinkHref="/register"
    >
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
              <Field.Label>Email</Field.Label>
              <Input
                type="email"
                placeholder="name@example.com"
                {...register('email')}
              />
              <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.password}>
              <Field.Label>Password</Field.Label>
              <Input
                type="password"
                placeholder="••••••••"
                {...register('password')}
              />
              <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
            </Field.Root>

            <Button
              type="submit"
              colorPalette="teal"
              variant="solid"
              width="full"
              loading={isSubmitting}
              loadingText="Signing in..."
              mt="2"
            >
              Sign in
            </Button>
          </Stack>
        </Fieldset.Root>
      </form>
    </AuthLayout>
  );
}
