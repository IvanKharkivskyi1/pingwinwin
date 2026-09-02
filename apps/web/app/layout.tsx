import type { Metadata } from 'next';
import './globals.css';
import { Provider } from './provider';

export const metadata: Metadata = {
  title: 'AI Travel Planner',
  description: 'Plan trips with an AI travel agent',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
