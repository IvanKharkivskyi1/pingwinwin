'use client';

import { DashboardCard } from '@/features/dashboard/components/dashboard-card';
import {
  Box,
  Link as ChakraLink,
  Flex,
  HStack,
  Heading,
  SimpleGrid,
  Spinner,
  VStack,
} from '@chakra-ui/react';
import { apiFetch } from '@lib/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const res = await apiFetch('/auth/me');

      if (!res.ok) {
        router.replace('/login');
        return;
      }

      setReady(true);
    };

    void checkAuth();
  }, [router]);

  if (!ready) {
    return (
      <Flex minH="50vh" align="center" justify="center">
        <Spinner size="xl" color="teal.500" borderWidth="4px" />
      </Flex>
    );
  }

  return (
    <Box as="main" px={6} maxW="4xl" mx="auto">
      <VStack align="start" gap={6}>
        <HStack justify="space-between" width="100%">
          <Heading as="h1" size="xl">
            Dashboard
          </Heading>
          <ChakraLink asChild color="teal.500" fontSize="sm">
            <Link href="/profile">View profile</Link>
          </ChakraLink>
        </HStack>

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} width="100%">
          <DashboardCard
            icon="🗺️"
            title="My Trips"
            emptyMessage="You haven't planned any trips yet."
          />
          <DashboardCard
            icon="❤️"
            title="Saved destinations"
            emptyMessage="No saved destinations yet."
          />
          <DashboardCard
            icon="🕐"
            title="Recent AI conversations"
            emptyMessage="No conversations yet."
          />
          <DashboardCard icon="🌤️" title="Upcoming trip" emptyMessage="No upcoming trips." />
        </SimpleGrid>
      </VStack>
    </Box>
  );
}
