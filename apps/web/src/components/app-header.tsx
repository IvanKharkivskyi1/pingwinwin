'use client';

import { BrandLogo } from '@/components/brand-logo';
import { LanguageSwitcher } from '@/components/language-switcher';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { triggerAuthChange, useAuthStatus } from '@/lib/use-auth-status';
import { useColorMode } from '@/providers/color-mode';
import {
  Avatar,
  Box,
  Button,
  Container,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerPositioner,
  DrawerRoot,
  DrawerTitle,
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
  VStack,
} from '@chakra-ui/react';
import { logout } from '@lib/auth';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { FiChevronDown, FiLogOut, FiMenu, FiMoon, FiSun, FiUser } from 'react-icons/fi';

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

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const displayName =
    user?.name?.trim() || user?.email?.split('@')[0] || commonT('guestNameFallback');

  const avatarLetter = displayName.charAt(0).toUpperCase();

  const labels: Record<NavItemKey, string> = {
    home: t('home'),
    trips: t('trips'),
    favorites: t('favorites'),
    chat: t('chat'),
  };

  const handleLogout = async () => {
    setMobileMenuOpen(false);

    try {
      await logout();
    } catch {
      // Ignore the API failure and still return the user
      // to the public home page.
    }

    triggerAuthChange();
    await refresh();
    router.replace('/');
  };

  const handleMobileNavigation = (href: string) => {
    setMobileMenuOpen(false);
    router.push(href);
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

              <Text
                fontWeight="bold"
                fontSize="lg"
                display={{
                  base: 'none',
                  sm: 'block',
                }}
              >
                {commonT('brandName')}
              </Text>
            </Flex>
          </Link>

          {!loading && isAuthenticated && <AuthenticatedNav pathname={pathname} labels={labels} />}

          <HStack
            gap={2}
            display={{
              base: 'none',
              md: 'flex',
            }}
            marginLeft="auto"
          >
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

            {!loading && isAuthenticated ? (
              <MenuRoot
                positioning={{
                  placement: 'bottom-end',
                  strategy: 'absolute',
                }}
              >
                <MenuTrigger asChild>
                  <Button variant="outline" size="sm" rounded="full">
                    <Avatar.Root size="xs">
                      <Avatar.Fallback>{avatarLetter}</Avatar.Fallback>
                    </Avatar.Root>

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
                          <HStack gap={2}>
                            <Avatar.Root size="sm">
                              <Avatar.Fallback>{avatarLetter}</Avatar.Fallback>
                            </Avatar.Root>

                            <Text>{displayName}</Text>
                          </HStack>
                        </MenuItemGroupLabel>

                        <MenuItem value="profile" onClick={() => router.push('/profile')}>
                          <FiUser />
                          {t('profile')}
                        </MenuItem>

                        <MenuItem value="logout" onClick={handleLogout}>
                          <FiLogOut />
                          {t('logout')}
                        </MenuItem>
                      </MenuItemGroup>
                    </MenuContent>
                  </MenuPositioner>
                </Portal>
              </MenuRoot>
            ) : (
              <>
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
              </>
            )}
          </HStack>

          <HStack
            gap={2}
            display={{
              base: 'flex',
              md: 'none',
            }}
            marginLeft="auto"
          >
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

            <IconButton
              aria-label={commonT('brandName')}
              variant="outline"
              size="sm"
              rounded="full"
              onClick={() => setMobileMenuOpen(true)}
            >
              <FiMenu />
            </IconButton>
          </HStack>
        </Flex>
      </Container>

      <DrawerRoot
        open={mobileMenuOpen}
        onOpenChange={(details) => setMobileMenuOpen(details.open)}
        placement="end"
      >
        <Portal>
          <DrawerPositioner>
            <DrawerBackdrop />

            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>{commonT('brandName')}</DrawerTitle>

                <DrawerCloseTrigger />
              </DrawerHeader>

              <DrawerBody>
                <VStack align="stretch" gap={2}>
                  {!loading && isAuthenticated ? (
                    <>
                      <Box px={3} py={4} borderBottomWidth="1px" mb={2}>
                        <HStack gap={3}>
                          <Avatar.Root size="md">
                            <Avatar.Fallback>{avatarLetter}</Avatar.Fallback>
                          </Avatar.Root>

                          <Box minW={0}>
                            <Text fontWeight="semibold" truncate>
                              {displayName}
                            </Text>

                            {user?.email && (
                              <Text fontSize="sm" color="gray.500" truncate>
                                {user.email}
                              </Text>
                            )}
                          </Box>
                        </HStack>
                      </Box>

                      {navItems.map((item) => {
                        const isActive =
                          pathname === item.href ||
                          (item.href !== '/' && pathname.startsWith(item.href));

                        return (
                          <Button
                            key={item.href}
                            justifyContent="flex-start"
                            variant={isActive ? 'solid' : 'ghost'}
                            colorPalette={isActive ? 'teal' : 'gray'}
                            onClick={() => handleMobileNavigation(item.href)}
                          >
                            {labels[item.key]}
                          </Button>
                        );
                      })}

                      <Button
                        justifyContent="flex-start"
                        variant="ghost"
                        onClick={() => handleMobileNavigation('/profile')}
                      >
                        <FiUser />
                        {t('profile')}
                      </Button>

                      <Button justifyContent="flex-start" variant="ghost" onClick={handleLogout}>
                        <FiLogOut />
                        {t('logout')}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        justifyContent="flex-start"
                        variant="ghost"
                        onClick={() => handleMobileNavigation('/login')}
                      >
                        {t('login')}
                      </Button>

                      <Button
                        justifyContent="flex-start"
                        colorPalette="teal"
                        onClick={() => handleMobileNavigation('/register')}
                      >
                        {t('register')}
                      </Button>
                    </>
                  )}
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </DrawerPositioner>
        </Portal>
      </DrawerRoot>
    </Box>
  );
}
