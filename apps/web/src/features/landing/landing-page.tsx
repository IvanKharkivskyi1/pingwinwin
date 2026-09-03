'use client';

import { BrandLogo } from '@/components/brand-logo';
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
import Link from 'next/link';
import { FiArrowRight, FiCheckCircle, FiStar } from 'react-icons/fi';

const features = [
  {
    icon: FiArrowRight,
    title: 'Trip planning',
    text: 'Build a personalized itinerary in minutes.',
  },
  {
    icon: FiStar,
    title: 'AI travel assistant',
    text: 'Get smart suggestions for routes, stays, and ideas.',
  },
  {
    icon: FiCheckCircle,
    title: 'Saved favorites',
    text: 'Keep the destinations, stays, and ideas you love.',
  },
];

export default function LandingPage() {
  const { colorMode } = useColorMode();

  return (
    <Box minH="100vh" bg={colorMode === 'dark' ? 'gray.900' : 'gray.50'}>
      <Container maxW="6xl" py={{ base: 10, md: 16 }} px={6}>
        <Grid templateColumns={{ base: '1fr', lg: '1.2fr 0.8fr' }} gap={8} alignItems="center">
          <Stack gap={6} align="flex-start">
            <HStack gap={3}>
              <BrandLogo size={42} />
              <Text fontWeight="bold" fontSize="lg">
                Pinguin Wing
              </Text>
            </HStack>

            <Heading as="h1" size="2xl" maxW="lg">
              AI travel planning for your next unforgettable trip.
            </Heading>

            <Text fontSize="lg" maxW="xl" color="fg.muted">
              Discover destination ideas, compare options, and build a trip plan with an AI travel
              assistant that keeps your preferences in sync.
            </Text>

            <Stack direction="row" gap={4} wrap="wrap">
              <Link href="/register">
                <Button colorPalette="teal" size="lg">
                  Start planning
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg">
                  Login
                </Button>
              </Link>
            </Stack>

            <Flex gap={6} wrap="wrap">
              <Text fontSize="sm" color="fg.muted">
                <strong>12k+</strong> travelers
              </Text>
              <Text fontSize="sm" color="fg.muted">
                <strong>4.9/5</strong> traveler rating
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
                Quick trip planner
              </Text>
              <Box as="label" display="grid" gap={2}>
                <Text fontSize="sm" fontWeight="medium">
                  Destination
                </Text>
                <Input placeholder="Kyiv, Paris, Tokyo" size="md" />
              </Box>
              <Box as="label" display="grid" gap={2}>
                <Text fontSize="sm" fontWeight="medium">
                  Travel dates
                </Text>
                <Input type="date" size="md" />
              </Box>
              <Box as="label" display="grid" gap={2}>
                <Text fontSize="sm" fontWeight="medium">
                  Trip duration
                </Text>
                <Input placeholder="5 days" size="md" />
              </Box>
              <Button colorPalette="teal" width="full">
                Build my itinerary
              </Button>
            </Stack>
          </Box>
        </Grid>

        <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} mt={14}>
          {features.map((feature) => (
            <Box
              key={feature.title}
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
                {feature.title}
              </Heading>
              <Text color="fg.muted">{feature.text}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
