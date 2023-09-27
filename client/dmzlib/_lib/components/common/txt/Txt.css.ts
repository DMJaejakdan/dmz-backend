import { theme } from '#/design/theme.css';
import { style, styleVariants } from '@vanilla-extract/css';

const base = style({
  color: theme.txt.white,
});

const fontSizeVar = {
  8: '0.5rem',
  10: '0.625rem',
  12: '0.75rem',
  13: '0.8125rem',
  14: '0.875rem',
  16: '1rem',
  18: '1.125rem',
  20: '1.25rem',
  24: '1.5rem',
  28: '1.75rem',
  32: '2rem',
};

export const SIZE_VARIANT = styleVariants(fontSizeVar, fontSize => [
  base,
  { fontSize: fontSize },
]);

const fontWeightsVar = {
  regular: '400',
  bold: '700',
};

export const WEIGHT_VARIANT = styleVariants(fontWeightsVar, fontWeights => [
  { fontWeight: fontWeights },
]);

export const ALIGN_VARIANT = styleVariants({
  start: { textAlign: 'start' },
  center: { textAlign: 'center' },
  end: { textAlign: 'end' },
  left: { textAlign: 'start' },
  right: { textAlign: 'end' },
});

export const COLOR_VARIANT = styleVariants({
  black: { color: theme.txt.black },
  disabled: { color: theme.txt.disabled },
  white: { color: theme.txt.white },
});
