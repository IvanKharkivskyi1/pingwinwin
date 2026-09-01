import { Box, Button, Container, Heading, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';

export default function Home() {
  return (
    <Box as="main" minH="100vh" bg="gray.50" color="gray.900" px={6} py={16}>
      <Container maxW="lg">
        <Stack gap={8} align="flex-start">
          <Heading as="h1" size="2xl">
            Pingwinwin
          </Heading>

          <Text fontSize="lg">
            Plan your next trip with a simple AI-powered travel workflow.
          </Text>

          <Stack direction="row" gap={4} wrap="wrap">
            <Link href="/register" passHref>
              <Button colorPalette="teal" size="lg">
                Register
              </Button>
            </Link>
            <Link href="/login" passHref>
              <Button variant="outline" size="lg">
                Log in
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
