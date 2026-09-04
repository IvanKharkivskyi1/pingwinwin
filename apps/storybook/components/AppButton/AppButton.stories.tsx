import { AppButton } from '@pingwinwin/ui';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

const meta = {
  title: 'Components/AppButton',
  component: AppButton,
  tags: ['autodocs'],

  argTypes: {
    children: {
      control: 'text',
      description: 'Button label',
    },

    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost'],
      description: 'Button visual style',
    },

    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Button size',
    },

    colorPalette: {
      control: 'select',
      options: ['teal', 'gray', 'blue', 'red', 'green'],
      description: 'Button color palette',
    },

    disabled: {
      control: 'boolean',
      description: 'Disable the button',
    },

    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },

    onClick: {
      description: 'Button click handler',
    },
  },

  args: {
    children: 'Create trip',
    variant: 'solid',
    size: 'md',
    colorPalette: 'teal',
    disabled: false,
    loading: false,
    onClick: fn(),
  },
} satisfies Meta<typeof AppButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    colorPalette: 'gray',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Creating...',
  },
};
