import { Card, Center } from '@chakra-ui/react';
import type { ReactNode } from 'react';

export default function AuthGroupLayout({ children }: { children: ReactNode }) {
  return (
    <Center minH="100vh" px="4">
      <Card.Root variant="subtle" size="md">
        {children}
      </Card.Root>
    </Center>
  );
}
