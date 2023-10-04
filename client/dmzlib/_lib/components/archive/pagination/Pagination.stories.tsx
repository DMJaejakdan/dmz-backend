import type { Meta, StoryObj } from '@storybook/react';

import Pagination from './Pagination';

const meta = {
  title: 'Archive/Pagination/Pagination',
  component: Pagination,
  argTypes: {},
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    max: 12,
    currPage: 1,
    centerShownNums: 5,
  },
};
