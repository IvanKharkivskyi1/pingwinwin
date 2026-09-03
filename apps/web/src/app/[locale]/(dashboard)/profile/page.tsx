'use client';

import { triggerAuthChange } from '@/lib/use-auth-status';
import { useRouter } from '@/i18n/navigation';
import { Box, Button, Flex, Heading, Spinner, Text, VStack } from '@chakra-ui/react';
import { apiFetch, getErrorMessage, logout } from '@lib/auth';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

type Profile = {
  id: string;
  email: string;
  name: string | null;
};

export default function ProfilePage() {
  const router = useRouter();
  const t = useTranslations('ProfilePage');
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
          throw new Error(getErrorMessage(data, t('loadFailed')));
        }

        setProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : t('loadFailed'));
        router.replace('/login');
      }
    };

    void loadProfile();
  }, [mounted, router, t]);

  const handleLogout = async () => {
    await logout();
    triggerAuthChange();
    router.push('/');
  };

  if (!mounted || !profile) {
    return (
      <Flex minH="50vh" align="center" justify="center">
        <Spinner size="xl" color="teal.500" borderWidth="4px" />
      </Flex>
    );
  }

  return (
    <Box as="main" px={6} maxW="md" mx="auto">
      <VStack align="start" gap={4}>
        <Heading as="h1" size="xl">
          {t('title')}
        </Heading>

        {error && <Text color="red.500">{error}</Text>}

        <Text>
          {t('emailLabel')}: {profile.email}
        </Text>
        <Text>
          {t('name')}: {profile.name ?? '—'}
        </Text>

        <Button type="button" onClick={handleLogout} colorPalette="cyan">
          {t('logOut')}
        </Button>
      </VStack>
    </Box>
  );
}
