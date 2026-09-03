'use client';

import { TravelDashboardContent } from '@/features/dashboard/dashboard-page';
import LandingPage from '@/features/landing/landing-page';
import { useAuthStatus } from '@/lib/use-auth-status';
import { Flex, Spinner } from '@chakra-ui/react';

export default function HomePage() {
  const { user, isAuthenticated, loading } = useAuthStatus();

  if (loading) {
    return (
      <Flex minH="50vh" align="center" justify="center">
        <Spinner size="xl" color="teal.500" borderWidth="4px" />
      </Flex>
    );
  }

  if (isAuthenticated) {
    return <TravelDashboardContent user={user} />;
  }

  return <LandingPage />;
}
