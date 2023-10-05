import React from 'react';
import type { Preview } from '@storybook/react';
import { storybook } from './preview.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    Story => (
      <div className={storybook}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
