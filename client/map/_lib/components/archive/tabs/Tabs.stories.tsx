import type { Meta, StoryObj } from '@storybook/react';

import { Tabs } from './Tabs';
import { Chip } from '../../common/chip/Chip';

const meta = {
  title: 'Archive/Tabs',
  component: Tabs,
  argTypes: {},
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    TabContents: [
      { title: '드라마', children: <Chip type="filter" label="드라마" /> },
      { title: '영화', children: <Chip type="filter" label="영화" /> },
      { title: '인물', children: <Chip type="filter" label="인물" /> },
    ],
  },
};
