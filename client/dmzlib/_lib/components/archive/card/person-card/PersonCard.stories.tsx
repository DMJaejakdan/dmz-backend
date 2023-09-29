import type { Meta, StoryObj } from '@storybook/react';

import PersonCard from './PersonCard';

const meta = {
  title: 'Archive/Card/PersonCard',
  component: PersonCard,
  argTypes: {},
} satisfies Meta<typeof PersonCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    screen: 'pc',
    personCardData: {
      thumbnail: '',
      name: '유승윤',
      sex: '남',
      birthYear: 1234,
      fields: ['연출', '각본', '연기'],
    },
  },
};
