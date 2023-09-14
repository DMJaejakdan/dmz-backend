import { style } from '@vanilla-extract/css';
import { theme } from '../_lib/design/theme.css';

export const storybook = style({
  boxSizing: 'border-box',
  margin: 0,
  padding: '1rem',
  height: 'calc(100vh - 3rem)',
  fontSize: '100%',
  backgroundColor: theme.bg.d2,
  color: 'inherit',
  textDecoration: 'none',
  listStyleType: 'none',
});
