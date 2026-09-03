'use client';

import { useRequireAuth } from '@/lib/use-auth-status';
import { Box, Flex, Spinner } from '@chakra-ui/react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isReady, loading } = useRequireAuth();

  if (loading) {
    return (
      <Flex minH="100vh" align="center" justify="center">
        <Spinner size="xl" color="teal.500" borderWidth="4px" />
      </Flex>
    );
  }

  if (!isReady) {
    return null;
  }

  return <Box>{children}</Box>;
}
