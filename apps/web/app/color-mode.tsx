'use client';

import * as React from 'react';

type ColorMode = 'light' | 'dark';

interface ColorModeContextType {
  colorMode: ColorMode;
  setColorMode: (mode: ColorMode) => void;
  toggleColorMode: () => void;
}

const ColorModeContext = React.createContext<ColorModeContextType | undefined>(
  undefined,
);

function applyTheme(mode: ColorMode) {
  if (typeof document === 'undefined') return;

  document.documentElement.style.colorScheme = mode;
  document.documentElement.dataset.theme = mode;
  document.documentElement.classList.toggle('dark', mode === 'dark');
}

export function ColorModeProvider({ children }: { children: React.ReactNode }) {
  const [colorMode, setColorModeState] = React.useState<ColorMode>('light');

  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const preferredDark =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    const nextMode =
      savedTheme === 'dark' || savedTheme === 'light'
        ? savedTheme
        : preferredDark
          ? 'dark'
          : 'light';

    setColorModeState(nextMode);
    applyTheme(nextMode);
  }, []);

  const setColorMode = (mode: ColorMode) => {
    setColorModeState(mode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', mode);
    }
    applyTheme(mode);
  };

  const toggleColorMode = () => {
    setColorMode(colorMode === 'dark' ? 'light' : 'dark');
  };

  React.useEffect(() => {
    applyTheme(colorMode);
  }, [colorMode]);

  return (
    <ColorModeContext.Provider
      value={{ colorMode, setColorMode, toggleColorMode }}
    >
      {children}
    </ColorModeContext.Provider>
  );
}

export function useColorMode() {
  const context = React.useContext(ColorModeContext);
  if (!context) {
    return {
      colorMode: 'light' as ColorMode,
      setColorMode: () => {},
      toggleColorMode: () => {},
    };
  }
  return context;
}
