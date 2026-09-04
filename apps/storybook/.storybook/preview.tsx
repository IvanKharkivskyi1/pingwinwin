import { ChakraProvider } from '@chakra-ui/react';
import { system } from '@pingwinwin/ui';
import type { Decorator, Preview } from '@storybook/react';

const withChakra: Decorator = (Story) => (
  <ChakraProvider value={system}>
    <Story />
  </ChakraProvider>
);

const preview: Preview = {
  decorators: [withChakra],
};

export default preview;
