'use client';

import { BrandLogo } from '@/components/brand-logo';
import { ColorModeProvider, useColorMode } from '@/providers/color-mode';
import { Box, Button, ChakraProvider, IconButton, Text, defaultSystem } from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

function HomeButton() {
  return (
    <Link href="/" aria-label="Go to homepage">
      <Button variant="outline" aria-label="Go to homepage" bg="teal.500" pointerEvents="auto">
        <BrandLogo size={50} />
        <Text ml={2}>Pinguin Wing</Text>
      </Button>
    </Link>
  );
}

function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = colorMode === 'dark';

  return (
    <Box position="fixed" width="100%" zIndex={1000} p={4} pointerEvents="none">
      <Box display="flex" alignItems="center" justifyContent="space-between" gap="3">
        <HomeButton />
        <IconButton
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          variant="outline"
          size="lg"
          rounded="full"
          onClick={toggleColorMode}
          colorPalette={isDark ? 'yellow' : 'blue'}
          pointerEvents="auto"
        >
          {isDark ? <FiSun /> : <FiMoon />}
        </IconButton>
      </Box>
    </Box>
  );
}

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider>
        <ThemeToggle />
        {children}
      </ColorModeProvider>
    </ChakraProvider>
  );
}
