'use client';

import { BrandLogo } from '@/components/brand-logo';
import { VisitCounter } from '@/components/VisitCounter';
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
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FiChevronDown, FiMoon, FiSun, FiUser } from 'react-icons/fi';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/trips', label: 'Trips' },
  { href: '/favorites', label: 'Favorites' },
  { href: '/chat', label: 'Chat' },
];

function AuthenticatedNav({ pathname }: { pathname: string }) {
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
            <Link href={item.href}>{item.label}</Link>
          </Button>
        );
      })}
    </HStack>
  );
}

export function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, isAuthenticated, loading, refresh } = useAuthStatus();

  const displayName = user?.name?.trim() || user?.email?.split('@')[0] || 'Traveler';

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
          <Link href="/" aria-label="Go to the homepage">
            <Flex align="center" gap={3}>
              <BrandLogo size={36} />
              <Text fontWeight="bold" fontSize="lg">
                Pinguin Wing
              </Text>
            </Flex>
          </Link>
          <div>
            Visitors: <VisitCounter />
          </div>

          {!loading && isAuthenticated ? (
            <>
              <AuthenticatedNav pathname={pathname} />

              <HStack gap={2}>
                <IconButton
                  aria-label={colorMode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
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
                              Profile
                            </Text>
                          </MenuItem>
                          <MenuItem value="logout" onClick={handleLogout}>
                            Logout
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
              <IconButton
                aria-label={colorMode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
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
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button colorPalette="teal" size="sm">
                  Register
                </Button>
              </Link>
            </HStack>
          )}
        </Flex>
      </Container>
    </Box>
  );
}
