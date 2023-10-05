import theme from '#/design/theme.css';
import { style, styleVariants } from '@vanilla-extract/css';

const base = style({
  width: 'fit-content',
  fontWeight: 700,
  cursor: 'pointer',
  lineHeight: 0,
});

export const COLOR_VARIANT = styleVariants({
  white: [
    base,
    {
      backgroundColor: theme.colors.white,
      border: theme.border.transparent,
      color: theme.txt.black,
    },
  ],
  grey: [
    base,
    {
      backgroundColor: theme.colors.darkgrey,
      border: theme.border.transparent,
      color: theme.txt.white,
    },
  ],
  black: [
    base,
    {
      backgroundColor: 'black',
      border: theme.border.transparent,
      color: theme.txt.white,
    },
  ],
  key: [
    base,
    {
      backgroundColor: theme.bg.key,
      border: theme.border.transparent,
      color: theme.txt.white,
    },
  ],
});

export const STATUS_VARIANT = styleVariants({
  normal: {},
  disabled: { color: 'lightgrey', cursor: 'not-allowed' },
});

export const SIZE_VARIANT = styleVariants({
  large: {
    padding: '0 1.75rem 0 1.75rem',
    height: '3rem',
    fontSize: '1.25rem',
  },
  medium: { padding: '0 1.5rem 0 1.5rem', height: '2.25rem', fontSize: '1rem' },
  small: {
    padding: '0 1.125rem 0 1.125rem',
    height: '1.875rem',
    fontSize: '0.8125rem',
  },
});

export const SHAPE_VARIANT = styleVariants({
  round: { borderRadius: 100 },
  square: { borderRadius: '1rem' },
});

export const WIDTH_VARIANT = styleVariants({
  none: {},
  full: { width: '100%' },
});
