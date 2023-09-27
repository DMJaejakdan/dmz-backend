import type { Meta, StoryObj } from '@storybook/react';

import { FilterBox } from './FilterBox';

const meta = {
  title: 'Archive/SearchBox/FilterBox',
  component: FilterBox,
  argTypes: {},
} satisfies Meta<typeof FilterBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: '검색 조건을 찾아라',
    options: ['wow', 'condition'],
    onSelect: () => {},
  },
};
