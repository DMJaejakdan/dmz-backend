import type { Meta, StoryObj } from '@storybook/react';

import DateBox from './DateBox';

const meta = {
  title: 'Archive/SearchBox/DateBox',
  component: DateBox,
  argTypes: {},
} satisfies Meta<typeof DateBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: '검색 조건을 찾아라',
  },
};
