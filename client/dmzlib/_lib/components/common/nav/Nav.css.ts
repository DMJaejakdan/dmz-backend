import theme from '#/design/theme.css';
import { style } from '@vanilla-extract/css';

export const base = style({
  position: 'fixed',
  display: 'inline-block',
  left: '1rem',
  top: '1rem',
  backgroundColor: theme.bg.d3,
  border: theme.border.transparent,
  borderRadius: '0.5rem',
  padding: '0.5rem 0.75rem 0.5rem 0.75rem',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: theme.bg.d4,
  },
});
