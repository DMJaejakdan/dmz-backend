import type { Meta, StoryObj } from '@storybook/react';

import { PaginationButton } from './PaginationButton';

const meta = {
  title: 'Archive/Pagination/PaginationButton/PaginationButton',
  component: PaginationButton,
  argTypes: {},
} satisfies Meta<typeof PaginationButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    btnNum: 1,
    active: 'false',
  },
};
