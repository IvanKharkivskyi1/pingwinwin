import { defineRecipe } from '@chakra-ui/react';

export const appButtonRecipe = defineRecipe({
  base: {
    fontWeight: '600',
    borderRadius: 'lg',
  },

  variants: {
    variant: {
      solid: {
        bg: 'teal.500',
        color: 'white',
        _hover: {
          bg: 'teal.600',
        },
      },

      outline: {
        borderWidth: '1px',
        borderColor: 'teal.500',
        color: 'teal.600',
        _hover: {
          bg: 'teal.50',
        },
      },

      ghost: {
        color: 'teal.600',
        _hover: {
          bg: 'teal.50',
        },
      },
    },

    size: {
      sm: {
        h: '32px',
        px: '3',
        fontSize: 'sm',
      },

      md: {
        h: '40px',
        px: '4',
        fontSize: 'md',
      },

      lg: {
        h: '48px',
        px: '6',
        fontSize: 'lg',
      },
    },
  },

  defaultVariants: {
    variant: 'solid',
    size: 'md',
  },
});
