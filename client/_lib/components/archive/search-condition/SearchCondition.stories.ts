import type { Meta, StoryObj } from '@storybook/react';

import { SearchCondition } from './SearchCondition';

const meta = {
  title: 'Archive/SearchCondition',
  component: SearchCondition,
  argTypes: {},
} satisfies Meta<typeof SearchCondition>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { type: 'search', title: '검색 조건을 찾아라' },
};
