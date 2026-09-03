'use client';

import { DashboardCard } from '@/features/dashboard/components/dashboard-card';
import { Link } from '@/i18n/navigation';
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
import { useTranslations } from 'next-intl';
import { FiCalendar, FiStar, FiClock, FiCheckCircle } from 'react-icons/fi';

export function TravelDashboardContent({ user }: { user: AuthUser | null }) {
  const t = useTranslations('Dashboard');
  const commonT = useTranslations('Common');
  const greeting = user?.name?.trim() || user?.email?.split('@')[0] || commonT('guestNameFallback');

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
                {t('welcomeBack', { name: greeting })}
              </Text>
              <Heading as="h1" size="lg">
                {t('readyToPlan')}
              </Heading>
              <Text maxW="2xl" color="fg.muted">
                {t('heroText')}
              </Text>
            </VStack>

            <Button asChild colorPalette="teal" size="lg">
              <Link href="/trips">{t('planNewTrip')}</Link>
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
              {t('startPlanning')}
            </Heading>
            <HStack gap={3} wrap="wrap">
              <Input
                placeholder={t('destination')}
                aria-label={t('destination')}
                width={{ base: '100%', md: '220px' }}
              />
              <Input
                type="date"
                aria-label={t('departureDate')}
                width={{ base: '100%', md: '200px' }}
              />
              <Input
                placeholder={t('tripDuration')}
                aria-label={t('tripDuration')}
                width={{ base: '100%', md: '160px' }}
              />
              <Button colorPalette="teal" flexShrink={0}>
                {t('search')}
              </Button>
            </HStack>
          </VStack>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} width="100%">
          <DashboardCard icon={FiCalendar} title={t('myTrips')} emptyMessage={t('myTripsEmpty')} />
          <DashboardCard
            icon={FiStar}
            title={t('savedDestinations')}
            emptyMessage={t('savedDestinationsEmpty')}
          />
          <DashboardCard
            icon={FiClock}
            title={t('recentChats')}
            emptyMessage={t('recentChatsEmpty')}
          />
          <DashboardCard
            icon={FiCheckCircle}
            title={t('upcomingTrip')}
            emptyMessage={t('upcomingTripEmpty')}
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
