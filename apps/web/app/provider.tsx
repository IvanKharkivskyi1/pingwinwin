'use client';

import { Box, ChakraProvider, IconButton, defaultSystem } from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';
import { ColorModeProvider, useColorMode } from './color-mode';
import { BrandLogo } from './components/brand-logo';

function HomeButton() {
  return (
    <Link href="/" aria-label="Go to homepage">
      <IconButton variant="outline" size="lg" rounded="full" aria-label="Go to homepage">
        <BrandLogo size={20} />
      </IconButton>
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
    <Box position="fixed" width="100%" zIndex={1000} p={4}>
      <Box display="flex" alignItems="center" justifyContent="space-between" gap="3">
        <HomeButton />
        <IconButton
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          variant="outline"
          size="lg"
          rounded="full"
          onClick={toggleColorMode}
          colorPalette={isDark ? 'yellow' : 'blue'}
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
