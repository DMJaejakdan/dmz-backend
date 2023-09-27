import { theme } from '#/design/theme.css';
import { style, styleVariants } from '@vanilla-extract/css';

export const base = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: 0,
  width: '2rem',
  height: '2rem',
  borderRadius: 100,
  cursor: 'pointer',
});

export const PAGE_ACTIVE_VARIANT = styleVariants({
  true: [
    base,
    {
      backgroundColor: theme.colors.white,
    },
  ],
  false: [
    base,
    {
      backgroundColor: 'transparent',
      ':active': { backgroundColor: theme.colors.blackgrey },
    },
  ],
});
