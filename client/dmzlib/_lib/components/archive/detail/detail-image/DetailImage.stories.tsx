import type { Meta, StoryObj } from '@storybook/react';

import DetailImage from './DetailImage';

const meta = {
  title: 'Archive/Detail/DetailImage',
  component: DetailImage,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {},
} satisfies Meta<typeof DetailImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    detailImg: '',
    alt: '',
  },
};
