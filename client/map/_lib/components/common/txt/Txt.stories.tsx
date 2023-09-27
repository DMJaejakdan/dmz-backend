import type { Meta, StoryObj } from '@storybook/react';

import { Txt } from './Txt';

const meta = {
  title: 'Common/Txt',
  component: Txt,
  argTypes: {},
} satisfies Meta<typeof Txt>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { type: 'span', content: '텍스트를 입력하세요.', color: 'white' },
};
