import type { Preview } from '@storybook/react';
import React from 'react';
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
      <>
        <html className={storybook}>
          <body>
            <Story />
          </body>
        </html>
      </>
    ),
  ],
};

export default preview;
