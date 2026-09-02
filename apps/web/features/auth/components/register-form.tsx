'use client';

import { Alert, Button, Field, Fieldset, Input, Stack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { apiFetch, getErrorMessage } from '@lib/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  name: z.string().optional(),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', name: '', password: '' },
  });

  const onSubmit = async (values: RegisterFormData) => {
    setServerError(null);

    try {
      const res = await apiFetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(getErrorMessage(data, 'Registration failed'));
      }

      router.push('/profile');
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Registration failed');
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
            <Field.Label>Email</Field.Label>
            <Input type="email" placeholder="name@example.com" {...register('email')} />
            <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.name}>
            <Field.Label>Name</Field.Label>
            <Input type="text" placeholder="John" {...register('name')} />
            <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.password}>
            <Field.Label>Password</Field.Label>
            <Input type="password" placeholder="••••••••" {...register('password')} />
            <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
          </Field.Root>

          <Button
            type="submit"
            colorPalette="teal"
            variant="solid"
            width="full"
            loading={isSubmitting}
            loadingText="Registering..."
            mt="2"
          >
            Register
          </Button>
        </Stack>
      </Fieldset.Root>
    </form>
  );
}
