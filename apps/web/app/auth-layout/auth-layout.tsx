'use client';

import { Card, Center, Heading, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { ReactNode } from 'react';
import { BrandLogo } from '../components/brand-logo';

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
            <BrandLogo size={48} />
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
