'use client';

import { useRequireAuth } from '@/lib/use-auth-status';
import { Box, Flex, Heading, Spinner, Text } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';

export default function ChatPage() {
  const t = useTranslations('ChatPage');
  const { isReady, loading } = useRequireAuth();

  if (loading) {
    return (
      <Flex minH="50vh" align="center" justify="center">
        <Spinner size="xl" color="teal.500" borderWidth="4px" />
      </Flex>
    );
  }

  if (!isReady) {
    return null;
  }

  return (
    <Box as="main" maxW="6xl" mx="auto" px={6} py={10}>
      <Heading as="h1" size="xl" mb={3}>
        {t('title')}
      </Heading>
      <Text color="fg.muted">{t('description')}</Text>
    </Box>
  );
}
