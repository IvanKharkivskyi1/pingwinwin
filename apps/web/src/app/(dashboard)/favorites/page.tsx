'use client';

import { useRequireAuth } from '@/lib/use-auth-status';
import { Box, Flex, Heading, Spinner, Text } from '@chakra-ui/react';

export default function FavoritesPage() {
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
        Favorites
      </Heading>
      <Text color="fg.muted">
        Save the destinations, hotels, and experiences you want to revisit.
      </Text>
    </Box>
  );
}
