import { style, styleVariants } from '@vanilla-extract/css';

const base = style({});

export const spacingSizeVar = {
  0.25: '0.25rem',
  0.5: '0.5rem',
  0.75: '0.75rem',
  1: '1rem',
  1.5: '1.5rem',
  2: '2rem',
  2.5: '2.5rem',
  3: '3rem',
};

export const HORIZONTAL_VARIANT = styleVariants(spacingSizeVar, spacingSize => [
  base,
  { height: spacingSize },
]);

export const VERTICAL_VARIANT = styleVariants(spacingSizeVar, spacingSize => [
  base,
  { height: spacingSize, width: '100%' },
]);
