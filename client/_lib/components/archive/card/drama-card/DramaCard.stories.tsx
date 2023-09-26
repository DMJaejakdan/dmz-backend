import type { Meta, StoryObj } from '@storybook/react';

import { DramaCard } from './DramaCard';

const meta = {
  title: 'Archive/Card/drama-card',
  component: DramaCard,
  argTypes: {},
} satisfies Meta<typeof DramaCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    screen: 'pc',
    dramaCardData: {
      thumbnail: '',
      title: '제목',
      genres: ['장르1', '장르2', '장르3'],
      makers: ['김김김', '박박박'],
      releaseYear: 1234,
      episodesNum: 16,
    },
  },
};
