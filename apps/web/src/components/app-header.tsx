'use client';

import { BrandLogo } from '@/components/brand-logo';
import { LanguageSwitcher } from '@/components/language-switcher';
import { VisitCounter } from '@/components/VisitCounter';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { triggerAuthChange, useAuthStatus } from '@/lib/use-auth-status';
import { useColorMode } from '@/providers/color-mode';
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  IconButton,
  MenuContent,
  MenuItem,
  MenuItemGroup,
  MenuItemGroupLabel,
  MenuPositioner,
  MenuRoot,
  MenuTrigger,
  Portal,
  Text,
} from '@chakra-ui/react';
import { logout } from '@lib/auth';
import { useTranslations } from 'next-intl';
import { FiChevronDown, FiMoon, FiSun, FiUser } from 'react-icons/fi';

const navItems = [
  { href: '/', key: 'home' },
  { href: '/trips', key: 'trips' },
  { href: '/favorites', key: 'favorites' },
  { href: '/chat', key: 'chat' },
] as const;

type NavItemKey = (typeof navItems)[number]['key'];

function AuthenticatedNav({
  pathname,
  labels,
}: {
  pathname: string;
  labels: Record<NavItemKey, string>;
}) {
  return (
    <HStack gap={2} display={{ base: 'none', md: 'flex' }} wrap="wrap">
      {navItems.map((item) => {
        const isActive =
          pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

        return (
          <Button
            key={item.href}
            asChild
            variant={isActive ? 'solid' : 'ghost'}
            size="sm"
            colorPalette={isActive ? 'teal' : 'gray'}
          >
            <Link href={item.href}>{labels[item.key]}</Link>
          </Button>
        );
      })}
    </HStack>
  );
}

export function AppHeader() {
  const t = useTranslations('Header');
  const commonT = useTranslations('Common');
  const pathname = usePathname();
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, isAuthenticated, loading, refresh } = useAuthStatus();

  const displayName =
    user?.name?.trim() || user?.email?.split('@')[0] || commonT('guestNameFallback');

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // Ignore the API failure and still return the user to the public home page.
    }

    triggerAuthChange();
    await refresh();
    router.replace('/');
  };

  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      left={0}
      right={0}
      width="100%"
      zIndex={1000}
      borderBottomWidth="1px"
      borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
      bg={colorMode === 'dark' ? 'gray.950' : 'rgba(255,255,255,0.9)'}
      backdropFilter="blur(10px)"
    >
      <Container maxW="7xl" py={3}>
        <Flex align="center" justify="space-between" gap={4}>
          <Link href="/" aria-label={t('homeLinkAria')}>
            <Flex align="center" gap={3}>
              <BrandLogo size={36} />
              <Text fontWeight="bold" fontSize="lg">
                {commonT('brandName')}
              </Text>
            </Flex>
          </Link>
          <div>
            {t('visitors')}: <VisitCounter />
          </div>

          {!loading && isAuthenticated ? (
            <>
              <AuthenticatedNav
                pathname={pathname}
                labels={{
                  home: t('home'),
                  trips: t('trips'),
                  favorites: t('favorites'),
                  chat: t('chat'),
                }}
              />

              <HStack gap={2}>
                <LanguageSwitcher />

                <IconButton
                  aria-label={colorMode === 'dark' ? t('switchToLightMode') : t('switchToDarkMode')}
                  variant="outline"
                  size="sm"
                  rounded="full"
                  onClick={toggleColorMode}
                  colorPalette={colorMode === 'dark' ? 'yellow' : 'blue'}
                >
                  {colorMode === 'dark' ? <FiSun /> : <FiMoon />}
                </IconButton>

                <MenuRoot positioning={{ placement: 'bottom-end', strategy: 'absolute' }}>
                  <MenuTrigger asChild>
                    <Button variant="outline" size="sm" rounded="full">
                      <Text as="span" fontWeight="semibold">
                        {displayName}
                      </Text>
                      <FiChevronDown />
                    </Button>
                  </MenuTrigger>

                  <Portal>
                    <MenuPositioner>
                      <MenuContent minW="12rem" zIndex={1200} borderRadius="md" shadow="lg">
                        <MenuItemGroup>
                          <MenuItemGroupLabel>
                            <Text as="span" display="flex" alignItems="center" gap={2}>
                              <Avatar.Root size="sm">
                                <Avatar.Fallback>
                                  {displayName.charAt(0).toUpperCase()}
                                </Avatar.Fallback>
                              </Avatar.Root>

                              <Text>{displayName}</Text>
                            </Text>
                          </MenuItemGroupLabel>
                          <MenuItem value="profile" onClick={() => router.push('/profile')}>
                            <Text as="span" display="flex" alignItems="center" gap={2}>
                              <FiUser />
                              {t('profile')}
                            </Text>
                          </MenuItem>
                          <MenuItem value="logout" onClick={handleLogout}>
                            {t('logout')}
                          </MenuItem>
                        </MenuItemGroup>
                      </MenuContent>
                    </MenuPositioner>
                  </Portal>
                </MenuRoot>
              </HStack>
            </>
          ) : (
            <HStack gap={2}>
              <LanguageSwitcher />

              <IconButton
                aria-label={colorMode === 'dark' ? t('switchToLightMode') : t('switchToDarkMode')}
                variant="outline"
                size="sm"
                rounded="full"
                onClick={toggleColorMode}
                colorPalette={colorMode === 'dark' ? 'yellow' : 'blue'}
              >
                {colorMode === 'dark' ? <FiSun /> : <FiMoon />}
              </IconButton>

              <Link href="/login">
                <Button variant="ghost" size="sm">
                  {t('login')}
                </Button>
              </Link>
              <Link href="/register">
                <Button colorPalette="teal" size="sm">
                  {t('register')}
                </Button>
              </Link>
            </HStack>
          )}
        </Flex>
      </Container>
    </Box>
  );
}
