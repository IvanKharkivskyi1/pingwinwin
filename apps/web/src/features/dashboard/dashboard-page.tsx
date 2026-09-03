'use client';

import { DashboardCard } from '@/features/dashboard/components/dashboard-card';
import { useAuthStatus, type AuthUser } from '@/lib/use-auth-status';
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  Input,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { FiCalendar, FiStar, FiClock, FiCheckCircle } from 'react-icons/fi';

export function TravelDashboardContent({ user }: { user: AuthUser | null }) {
  const greeting = user?.name?.trim() || user?.email?.split('@')[0] || 'Traveler';

  return (
    <Container maxW="6xl" px={6} py={10}>
      <VStack align="stretch" gap={8}>
        <Box
          bg="linear-gradient(135deg, rgba(45, 212, 191, 0.18), rgba(59, 130, 246, 0.12))"
          borderRadius="2xl"
          borderWidth="1px"
          borderColor="teal.200"
          p={{ base: 5, md: 8 }}
        >
          <HStack justify="space-between" align="start" gap={4} wrap="wrap">
            <VStack align="start" gap={3}>
              <Text textStyle="sm" color="teal.500" fontWeight="semibold">
                Welcome back, {greeting}
              </Text>
              <Heading as="h1" size="lg">
                Ready to plan your next trip?
              </Heading>
              <Text maxW="2xl" color="fg.muted">
                Turn ideas into a memorable itinerary with AI suggestions, quick comparisons, and
                saved favorites.
              </Text>
            </VStack>

            <Button asChild colorPalette="teal" size="lg">
              <Link href="/trips">Plan a new trip</Link>
            </Button>
          </HStack>
        </Box>

        <Box
          borderWidth="1px"
          borderColor="gray.200"
          borderRadius="2xl"
          p={{ base: 4, md: 5 }}
          bg="whiteAlpha.100"
        >
          <VStack align="stretch" gap={4}>
            <Heading as="h2" size="md">
              Start planning
            </Heading>
            <HStack gap={3} wrap="wrap">
              <Input
                placeholder="Destination"
                aria-label="Destination"
                width={{ base: '100%', md: '220px' }}
              />
              <Input
                type="date"
                aria-label="Departure date"
                width={{ base: '100%', md: '200px' }}
              />
              <Input
                placeholder="Duration"
                aria-label="Trip duration"
                width={{ base: '100%', md: '160px' }}
              />
              <Button colorPalette="teal" flexShrink={0}>
                Search
              </Button>
            </HStack>
          </VStack>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} width="100%">
          <DashboardCard
            icon={FiCalendar}
            title="My Trips"
            emptyMessage="You haven't planned any trips yet."
          />
          <DashboardCard
            icon={FiStar}
            title="Saved destinations"
            emptyMessage="No saved destinations yet."
          />
          <DashboardCard
            icon={FiClock}
            title="Recent AI conversations"
            emptyMessage="No conversations yet."
          />
          <DashboardCard
            icon={FiCheckCircle}
            title="Upcoming trip"
            emptyMessage="No upcoming trips."
          />
        </SimpleGrid>
      </VStack>
    </Container>
  );
}

export default function DashboardPage() {
  const { user, isAuthenticated, loading } = useAuthStatus();

  if (loading) {
    return (
      <Flex minH="50vh" align="center" justify="center">
        <Spinner size="xl" color="teal.500" borderWidth="4px" />
      </Flex>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return <TravelDashboardContent user={user} />;
}
