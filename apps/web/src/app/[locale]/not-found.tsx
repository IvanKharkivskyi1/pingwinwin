import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <Box as="main" minH="100vh" display="flex" alignItems="center" justifyContent="center" px={4}>
      <VStack gap={4} textAlign="center">
        <Heading size="2xl">{t('title')}</Heading>
        <Text color="fg.muted">{t('message')}</Text>
        <Button asChild colorPalette="teal">
          <Link href="/">{t('backHome')}</Link>
        </Button>
      </VStack>
    </Box>
  );
}
