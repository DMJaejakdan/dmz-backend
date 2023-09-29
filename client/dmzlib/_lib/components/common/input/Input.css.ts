import theme from '#/design/theme.css';
import { style } from '@vanilla-extract/css';

export const base = style({
  backgroundColor: theme.bg.input,
  border: theme.border.input,
  borderRadius: '1rem',
  width: '100%',
  padding: '0.75rem 1rem 0.75rem 1rem',
  color: theme.txt.white,

  '::placeholder': {
    color: theme.colors.grey,
  },
  ':focus': {
    outline: theme.colors.white + ' solid 2px',
    border: theme.border.transparent,
  },
});
