'use client';

import { Box, Button, Flex, Heading, Spinner, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { apiFetch, getErrorMessage, logout } from '../../lib/auth';

type Profile = {
  id: string;
  email: string;
  name: string | null;
};

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const loadProfile = async () => {
      try {
        const res = await apiFetch('/auth/me');

        const data = await res.json();

        if (!res.ok) {
          throw new Error(getErrorMessage(data, 'Failed to load profile'));
        }

        setProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile');
        router.replace('/login');
      }
    };

    void loadProfile();
  }, [mounted, router]);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  if (!mounted || !profile) {
    return (
      <Flex minH="50vh" align="center" justify="center">
        <Spinner size="xl" color="teal.500" borderWidth="4px" />
      </Flex>
    );
  }

  return (
    <Box as="main" p={6} maxW="md" mx="auto">
      <VStack align="start" gap={4}>
        <Heading as="h1" size="xl">
          Profile
        </Heading>

        {error && <Text color="red.500">{error}</Text>}

        <Text>Email: {profile.email}</Text>
        <Text>Name: {profile.name ?? '—'}</Text>

        <Button type="button" onClick={handleLogout} colorPalette="cyan">
          Log out
        </Button>
      </VStack>
    </Box>
  );
}
