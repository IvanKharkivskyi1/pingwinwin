import { Box, Container, Flex, HStack, Text } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';

const storybookUrl = process.env.NEXT_PUBLIC_STORYBOOK_URL;

export function AppFooter() {
  const t = useTranslations('Footer');
  const commonT = useTranslations('Common');

  return (
    <Box as="footer" borderTopWidth="1px" borderColor="gray.200" bg="bg">
      <Container maxW="7xl" py={6}>
        <Flex
          align="center"
          justify="space-between"
          gap={4}
          direction={{ base: 'column', md: 'row' }}
        >
          <Text fontSize="sm" color="gray.500">
            © {new Date().getFullYear()} {commonT('brandName')}
          </Text>

          <HStack gap={4} fontSize="sm" flexWrap="wrap" justify="center">
            <Link href="/privacy">
              <Text color="gray.500" _hover={{ color: 'teal.500' }} transition="color 0.2s">
                {t('privacy')}
              </Text>
            </Link>

            <Link href="/terms">
              <Text color="gray.500" _hover={{ color: 'teal.500' }} transition="color 0.2s">
                {t('terms')}
              </Text>
            </Link>

            {storybookUrl && (
              <a
                href={storybookUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--chakra-colors-gray-500)',
                  transition: 'color 0.2s',
                }}
              >
                {t('componentLibrary')}
              </a>
            )}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
