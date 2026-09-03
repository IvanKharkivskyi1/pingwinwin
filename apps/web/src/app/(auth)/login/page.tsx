'use client';

import { AuthLayout } from '@/features/auth/components/auth-layout';
import { LoginForm } from '@/features/auth/components/login-form';
import { useRequireAuth } from '@/lib/use-auth-status';

export default function LoginPage() {
  const { isAuthenticated, loading } = useRequireAuth({ redirectIfAuthenticatedTo: '/' });

  if (loading || isAuthenticated) {
    return null;
  }

  return (
    <AuthLayout
      title="Login"
      footerText="You don't have an account?"
      footerLinkText="Register"
      footerLinkHref="/register"
    >
      <LoginForm />
    </AuthLayout>
  );
}
