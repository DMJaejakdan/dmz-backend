import { theme } from '#/design/theme.css';
import { style } from '@vanilla-extract/css';

export const base = style({
  backgroundColor: 'transparent',
  border: theme.border.input,
  borderRadius: '1rem',
  padding: '0.75rem 1rem 0.75rem 1rem',

  '::placeholder': {
    color: theme.colors.lightgrey,
  },
  ':focus': {
    outline: theme.colors.white + ' solid 2px',
    border: theme.border.transparent,
  },
});
