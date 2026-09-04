import { AnalyticsTracker } from '@/components/AnalyticsTracker';
import { AppShell } from '@/components/app-shell';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { routing } from '@/i18n/routing';
import { Provider } from '@/providers/provider';
import type { Metadata } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import '../../styles/globals.css';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider>
          <Provider>
            <AppShell>
              <AnalyticsTracker />
              {children}
              <GoogleAnalytics />
            </AppShell>
          </Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
