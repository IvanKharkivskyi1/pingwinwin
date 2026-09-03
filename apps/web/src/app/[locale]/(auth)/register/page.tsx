'use client';

import { AuthLayout } from '@/features/auth/components/auth-layout';
import { RegisterForm } from '@/features/auth/components/register-form';
import { useRouter } from '@/i18n/navigation';
import { useAuthStatus } from '@/lib/use-auth-status';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

export default function RegisterPage() {
  const router = useRouter();
  const t = useTranslations('RegisterPage');
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
      footerLinkHref="/login"
    >
      <RegisterForm />
    </AuthLayout>
  );
}
