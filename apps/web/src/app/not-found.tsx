import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Box as="main" minH="100vh" display="flex" alignItems="center" justifyContent="center" px={4}>
      <VStack gap={4} textAlign="center">
        <Heading size="2xl">404</Heading>
        <Text color="fg.muted">This page could not be found.</Text>
        <Button asChild colorPalette="teal">
          <Link href="/">Go back home</Link>
        </Button>
      </VStack>
    </Box>
  );
}
