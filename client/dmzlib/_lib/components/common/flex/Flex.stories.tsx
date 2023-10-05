import type { Meta, StoryObj } from '@storybook/react';

import Flex from './Flex';

const meta = {
  title: 'Common/Flex',
  component: Flex,
  argTypes: {},
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    direction: 'row',
    justify: 'center',
    align: 'center',
    children: <span>text</span>,
  },
};
