'use client';

import { Card, Center, Heading, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

interface AuthLayoutProps {
  title: string;
  children: ReactNode;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
}

export function AuthLayout({
  title,
  children,
  footerText,
  footerLinkText,
  footerLinkHref,
}: AuthLayoutProps) {
  return (
    <Center minH="100vh" px="4">
      <Card.Root variant="subtle" size="md">
        <Card.Header>
          <VStack gap="3" align="center">
            <Image
              src="https://j0r5rfqfy848ahyl.public.blob.vercel-storage.com/logo/logo.webp"
              alt="Logo"
              width={48}
              height={48}
              priority
            />
            <Heading size="xl" textAlign="center">
              {title}
            </Heading>
          </VStack>
        </Card.Header>

        <Card.Body>{children}</Card.Body>

        <Card.Footer justifyContent="center">
          <Text fontSize="sm" color="fg.muted">
            {footerText}{' '}
            <Link href={footerLinkHref}>
              <Text
                as="span"
                color="teal.500"
                fontWeight="medium"
                _hover={{ textDecoration: 'underline' }}
              >
                {footerLinkText}
              </Text>
            </Link>
          </Text>
        </Card.Footer>
      </Card.Root>
    </Center>
  );
}
