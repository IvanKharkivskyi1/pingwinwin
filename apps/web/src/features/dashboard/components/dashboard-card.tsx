import { Box, Card, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import type { ComponentType } from 'react';

interface DashboardCardProps {
  icon: ComponentType<{ boxSize?: number; color?: string }>;
  title: string;
  emptyMessage: string;
}

export function DashboardCard({ icon, title, emptyMessage }: DashboardCardProps) {
  return (
    <Card.Root variant="subtle" size="md">
      <Card.Body>
        <VStack align="start" gap={2}>
          <HStack gap={2} align="center">
            <Box
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              width={10}
              height={10}
              borderRadius="lg"
              bg="teal.100"
              color="teal.700"
            >
              <Icon as={icon} boxSize={5} />
            </Box>
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
