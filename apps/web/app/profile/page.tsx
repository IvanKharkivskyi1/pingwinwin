'use client';

import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  API_URL,
  clearAccessToken,
  getAccessToken,
  getErrorMessage,
} from '../../lib/auth';

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

    const token = getAccessToken();

    if (!token) {
      router.replace('/login');
      return;
    }

    const loadProfile = async () => {
      try {
        const res = await fetch(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(getErrorMessage(data, 'Failed to load profile'));
        }

        setProfile(data);
      } catch (err) {
        clearAccessToken();
        setError(err instanceof Error ? err.message : 'Failed to load profile');
        router.replace('/login');
      }
    };

    void loadProfile();
  }, [mounted, router]);

  const handleLogout = () => {
    clearAccessToken();
    router.push('/login');
  };

  // Повертаємо null до гігратації клієнта, щоб повністю уникнути Hydration Mismatch
  if (!mounted || !profile) {
    return (
      <Box p={6}>
        <Text>Loading...</Text>
      </Box>
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

        <Button type="button" onClick={handleLogout} colorPalette="red">
          Log out
        </Button>

        <Link href="/">Home</Link>
      </VStack>
    </Box>
  );
}
