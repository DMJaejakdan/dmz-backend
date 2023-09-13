import { style, styleVariants } from '@vanilla-extract/css';

const base = style({});

export const container = styleVariants({
  '1rem': { width: '1rem', height: '1rem' },
  '2rem': { width: '2rem', height: '2rem' },
  '3rem': { width: '3rem', height: '3rem' },
});
