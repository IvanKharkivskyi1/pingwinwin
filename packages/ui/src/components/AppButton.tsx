import type { ButtonProps } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';

export interface AppButtonProps extends ButtonProps {
  children: React.ReactNode;
}

export function AppButton({ children, ...props }: AppButtonProps) {
  return (
    <Button colorPalette="teal" {...props}>
      {children}
    </Button>
  );
}
