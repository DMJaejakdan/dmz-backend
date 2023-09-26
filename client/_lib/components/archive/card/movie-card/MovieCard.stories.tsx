import type { Meta, StoryObj } from '@storybook/react';

import { MovieCard } from './MovieCard';

const meta = {
  title: 'Archive/Card/movie-card',
  component: MovieCard,
  argTypes: {},
} satisfies Meta<typeof MovieCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    screen: 'pc',
    movieCardData: {
      thumbnail: '',
      title: '제목',
      genres: ['장르1', '장르2', '장르3'],
      director: '유승윤',
      releaseYear: 1234,
    },
  },
};
