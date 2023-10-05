import { style, styleVariants } from '@vanilla-extract/css';
export const base = style({});

export const SHOW_VARIANT = styleVariants({
  hide: { display: 'none' },
  show: { display: 'block' },
});
