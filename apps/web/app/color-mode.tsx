'use client'

import type { ThemeProviderProps } from 'next-themes'
import { ThemeProvider } from 'next-themes'

export function ColorModeProvider(props: ThemeProviderProps) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange {...props} />
  )
}