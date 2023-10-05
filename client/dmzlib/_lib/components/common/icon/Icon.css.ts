import theme from '#/design/theme.css';
import { style, styleVariants } from '@vanilla-extract/css';

const base = style({});

export const COLOR_VARIANT = styleVariants({
  black: { fill: theme.colors.black },
  white: { fill: theme.colors.white },
  lightgrey: { fill: theme.colors.lightgrey },
  darkgrey: { fill: theme.colors.darkgrey },
});
export const CURSOR_VARIANT = styleVariants({
  default: { cursor: 'default' },
  pointer: { cursor: 'pointer' },
});
