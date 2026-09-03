'use client';

import { BrandLogo } from '@/components/brand-logo';
import { Link } from '@/i18n/navigation';
import { useColorMode } from '@/providers/color-mode';
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  Input,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { FiArrowRight, FiCheckCircle, FiStar } from 'react-icons/fi';

const features = [
  { icon: FiArrowRight, key: 'tripPlanning' },
  { icon: FiStar, key: 'aiAssistant' },
  { icon: FiCheckCircle, key: 'savedFavorites' },
] as const;

export default function LandingPage() {
  const t = useTranslations('LandingPage');
  const commonT = useTranslations('Common');
  const { colorMode } = useColorMode();

  return (
    <Box minH="100vh" bg={colorMode === 'dark' ? 'gray.900' : 'gray.50'}>
      <Container maxW="6xl" py={{ base: 10, md: 16 }} px={6}>
        <Grid templateColumns={{ base: '1fr', lg: '1.2fr 0.8fr' }} gap={8} alignItems="center">
          <Stack gap={6} align="flex-start">
            <HStack gap={3}>
              <BrandLogo size={42} />
              <Text fontWeight="bold" fontSize="lg">
                {commonT('brandName')}
              </Text>
            </HStack>

            <Heading as="h1" size="2xl" maxW="lg">
              {t('headline')}
            </Heading>

            <Text fontSize="lg" maxW="xl" color="fg.muted">
              {t('description')}
            </Text>

            <Stack direction="row" gap={4} wrap="wrap">
              <Link href="/register">
                <Button colorPalette="teal" size="lg">
                  {t('startPlanning')}
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg">
                  {t('login')}
                </Button>
              </Link>
            </Stack>

            <Flex gap={6} wrap="wrap">
              <Text fontSize="sm" color="fg.muted">
                {t.rich('travelerCount', { strong: (chunks) => <strong>{chunks}</strong> })}
              </Text>
              <Text fontSize="sm" color="fg.muted">
                {t.rich('rating', { strong: (chunks) => <strong>{chunks}</strong> })}
              </Text>
            </Flex>
          </Stack>

          <Box
            borderWidth="1px"
            borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
            borderRadius="2xl"
            bg={colorMode === 'dark' ? 'gray.800' : 'white'}
            p={6}
          >
            <Stack gap={4}>
              <Text fontWeight="semibold" fontSize="sm" color="teal.500">
                {t('plannerLabel')}
              </Text>
              <Box as="label" display="grid" gap={2}>
                <Text fontSize="sm" fontWeight="medium">
                  {t('destinationLabel')}
                </Text>
                <Input placeholder={t('destinationPlaceholder')} size="md" />
              </Box>
              <Box as="label" display="grid" gap={2}>
                <Text fontSize="sm" fontWeight="medium">
                  {t('travelDatesLabel')}
                </Text>
                <Input type="date" size="md" />
              </Box>
              <Box as="label" display="grid" gap={2}>
                <Text fontSize="sm" fontWeight="medium">
                  {t('tripDurationLabel')}
                </Text>
                <Input placeholder={t('tripDurationPlaceholder')} size="md" />
              </Box>
              <Button colorPalette="teal" width="full">
                {t('buildItinerary')}
              </Button>
            </Stack>
          </Box>
        </Grid>

        <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} mt={14}>
          {features.map((feature) => {
            const title = t(`features.${feature.key}.title`);
            const text = t(`features.${feature.key}.text`);

            return (
              <Box
                key={feature.key}
                borderWidth="1px"
                borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
                borderRadius="2xl"
                bg={colorMode === 'dark' ? 'gray.800' : 'white'}
                p={5}
              >
                <Box
                  display="inline-flex"
                  alignItems="center"
                  justifyContent="center"
                  width={10}
                  height={10}
                  borderRadius="lg"
                  bg={colorMode === 'dark' ? 'teal.500' : 'teal.100'}
                  color={colorMode === 'dark' ? 'white' : 'teal.700'}
                  mb={3}
                >
                  <Icon as={feature.icon} boxSize={5} />
                </Box>
                <Heading as="h3" size="sm" mb={2}>
                  {title}
                </Heading>
                <Text color="fg.muted">{text}</Text>
              </Box>
            );
          })}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
