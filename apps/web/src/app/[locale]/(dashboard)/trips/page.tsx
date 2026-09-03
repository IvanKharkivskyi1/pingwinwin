'use client';

import { TravelDashboardContent } from '@/features/dashboard/dashboard-page';
import { useRequireAuth } from '@/lib/use-auth-status';
import { Box, Flex, Heading, Spinner, Text } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';

export default function TripsPage() {
  const t = useTranslations('TripsPage');
  const { user, isReady, loading } = useRequireAuth({ requireUser: true });

  if (loading) {
    return (
      <Flex minH="50vh" align="center" justify="center">
        <Spinner size="xl" color="teal.500" borderWidth="4px" />
      </Flex>
    );
  }

  if (!isReady || !user) {
    return null;
  }

  return (
    <Box as="main" maxW="6xl" mx="auto" px={6} py={10}>
      <Heading as="h1" size="xl" mb={3}>
        {t('title')}
      </Heading>
      <Text color="fg.muted" mb={6}>
        {t('description')}
      </Text>
      <TravelDashboardContent user={user} />
    </Box>
  );
}
