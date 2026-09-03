'use client';

import { AppHeader } from '@/components/app-header';
import { Box } from '@chakra-ui/react';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-shell">
      <AppHeader />
      <Box as="main" flex="1" minH={0} width="100%" pt="88px">
        {children}
      </Box>
    </div>
  );
}
