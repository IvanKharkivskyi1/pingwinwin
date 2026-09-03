'use client';

import { AuthProvider } from '@/lib/use-auth-status';
import { ColorModeProvider } from '@/providers/color-mode';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider>
        <AuthProvider>{children}</AuthProvider>
      </ColorModeProvider>
    </ChakraProvider>
  );
}
