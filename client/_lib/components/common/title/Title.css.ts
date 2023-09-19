import { theme } from '#/design/theme.css';
import { style, styleVariants } from '@vanilla-extract/css';

const base = style({
  color: theme.txt.white,
});

const fontSizeVar = {
  h1: '2rem',
  h2: '1.5rem',
  h3: '1.5rem',
  h4: '1.25rem',
  h5: '1rem',
};

const fontWeightsVar = {
  h1: '700',
  h2: '700',
  h3: '400',
  h4: '400',
  h5: '700',
};

export const WEIGHT_VARIANT = styleVariants(fontWeightsVar, fontWeights => [
  { fontWeight: fontWeights },
]);

export const SIZE_VARIANT = styleVariants(fontSizeVar, fontSize => [
  base,
  { fontSize: fontSize, marginBottom: fontSize },
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
  white: { color: theme.txt.white },
});
