import type { Meta, StoryObj } from '@storybook/react';

import { InputBox } from './InputBox';

const meta = {
  title: 'Archive/SearchBox/InputBox',
  component: InputBox,
  argTypes: {},
} satisfies Meta<typeof InputBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: '검색 조건을 찾아라',
    placeholder: '검색어를 입력하십시오',
  },
};
