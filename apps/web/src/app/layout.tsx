import { AppShell } from '@/components/app-shell';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { Provider } from '@/providers/provider';
import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'AI Travel Planner',
  description: 'Plan trips with an AI travel agent',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider>
          <AppShell>
            {children}
            <GoogleAnalytics />
          </AppShell>
        </Provider>
      </body>
    </html>
  );
}
