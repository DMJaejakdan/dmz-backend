import type { Meta, StoryObj } from '@storybook/react';

import Nav from './Nav';

const meta = {
  title: 'Common/Nav',
  component: Nav,
  argTypes: {},
} satisfies Meta<typeof Nav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { text: '지도 보기' },
};
