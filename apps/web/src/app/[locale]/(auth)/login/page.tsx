'use client';

import { AuthLayout } from '@/features/auth/components/auth-layout';
import { LoginForm } from '@/features/auth/components/login-form';
import { useRouter } from '@/i18n/navigation';
import { useAuthStatus } from '@/lib/use-auth-status';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const t = useTranslations('LoginPage');
  const { isAuthenticated, loading } = useAuthStatus();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated, loading, router]);

  if (loading || isAuthenticated) {
    return null;
  }

  return (
    <AuthLayout
      title={t('title')}
      footerText={t('footerText')}
      footerLinkText={t('footerLinkText')}
      footerLinkHref="/register"
    >
      <LoginForm />
    </AuthLayout>
  );
}
