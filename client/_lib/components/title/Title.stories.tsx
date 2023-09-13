import type { Meta, StoryObj } from '@storybook/react';
import { Title } from './Title';

/**
 * @author 박성준
 * @todo white를 글로벌스타일 white으로
 */

const meta = {
  title: 'Common/Title',
  component: Title,
  argTypes: {},
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  // todo
  args: { hN: 'h1', content: 'Title', color: 'white' },
};
