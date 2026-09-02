import { Card, HStack, Text, VStack } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface DashboardCardProps {
  icon: ReactNode;
  title: string;
  emptyMessage: string;
}

export function DashboardCard({ icon, title, emptyMessage }: DashboardCardProps) {
  return (
    <Card.Root variant="subtle" size="md">
      <Card.Body>
        <VStack align="start" gap={2}>
          <HStack gap={2}>
            <Text fontSize="xl">{icon}</Text>
            <Text fontWeight="semibold">{title}</Text>
          </HStack>
          <Text fontSize="sm" color="fg.muted">
            {emptyMessage}
          </Text>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}
