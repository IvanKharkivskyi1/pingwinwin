import { createSystem, defaultConfig } from '@chakra-ui/react';
import { appButtonRecipe } from './recipes';

export const system = createSystem(defaultConfig, {
  theme: {
    recipes: {
      appButton: appButtonRecipe,
    },
  },
});
