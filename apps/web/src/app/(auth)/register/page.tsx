'use client';

import { AuthLayout } from '@/features/auth/components/auth-layout';
import { RegisterForm } from '@/features/auth/components/register-form';
import { useRequireAuth } from '@/lib/use-auth-status';

export default function RegisterPage() {
  const { isAuthenticated, loading } = useRequireAuth({ redirectIfAuthenticatedTo: '/' });

  if (loading || isAuthenticated) {
    return null;
  }

  return (
    <AuthLayout
      title="Register"
      footerText="Already have an account?"
      footerLinkText="Login"
      footerLinkHref="/login"
    >
      <RegisterForm />
    </AuthLayout>
  );
}
