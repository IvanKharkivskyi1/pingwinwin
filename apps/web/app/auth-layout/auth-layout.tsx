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
      <Card.Root>
        <Card.Header>
          <VStack gap="3" align="center">
            <Image
              src="https://iynb6msbiue214kh.private.blob.vercel-storage.com/logo/logo.webp?vercel-blob-valid-until=1787926371009&vercel-blob-delegation=eyJzdG9yZUlkIjoic3RvcmVfaXluQjZtc0JJVUUyMTRraCIsIm93bmVySWQiOiJ0ZWFtX2ZWSVJzcjRrUG9KaHJubWtCaHg5dW42RiIsInBhdGhuYW1lIjoiKiIsIm9wZXJhdGlvbnMiOlsiZ2V0IiwiaGVhZCJdLCJ2YWxpZFVudGlsIjoxNzg3OTY5NDM2NjkxLCJpYXQiOjE3ODc5MjYyMzU4MTV9.GtqXlCMePIUu2Fuf3dlL4XGqKyObXevJT9dyRMra__M&vercel-blob-signature=tZmbCpuVEYGQQfOF8gWV1vKTAqHuAUdWseinCD1rXTY"
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
