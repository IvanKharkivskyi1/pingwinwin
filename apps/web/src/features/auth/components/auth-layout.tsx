import { BrandLogo } from '@/components/brand-logo';
import { Card, Heading, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import type { ReactNode } from 'react';

interface AuthLayoutProps {
  title: string;
  children: ReactNode;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
}

// Card.Root shell is provided by app/(auth)/layout.tsx
export function AuthLayout({
  title,
  children,
  footerText,
  footerLinkText,
  footerLinkHref,
}: AuthLayoutProps) {
  return (
    <>
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
    </>
  );
}
