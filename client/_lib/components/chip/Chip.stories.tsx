import type { Meta, StoryObj } from '@storybook/react';

import { Chip } from './Chip';

const meta = {
  title: 'Common/Chip',
  component: Chip,
  argTypes: {},
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { type: 'suggestion', label: '하하 저는 칩이지요' },
};
