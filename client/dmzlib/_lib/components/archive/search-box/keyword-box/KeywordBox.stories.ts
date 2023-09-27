import type { Meta, StoryObj } from '@storybook/react';

import { KeywordBox } from './KeywordBox';

const meta = {
  title: 'Archive/SearchBox/KeywordBox',
  component: KeywordBox,
  argTypes: {},
} satisfies Meta<typeof KeywordBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: '키워드를 검색하세요',
    onFind: () => null,
  },
};
