import type { Meta, StoryObj } from '@storybook/react';

import { PaginationChevron } from './PaginationChevron';

const meta = {
  title: 'Archive/Pagination/PaginationChevron/PaginationChevron',
  component: PaginationChevron,
  argTypes: {},
} satisfies Meta<typeof PaginationChevron>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    direction: 'left',
  },
};
