import { style, styleVariants } from '@vanilla-extract/css';

const base = style({
  fontWeight: 700,
});

const titleFontSizeVar = {
  h1: '2rem',
  h2: '1.75rem',
  h3: '1.5rem',
  h4: '1.25rem',
  h5: '1rem',
};

export const titleFontSize = styleVariants(titleFontSizeVar, titleFontSize => [
  base,
  { fontSize: titleFontSize },
]);

export const titleAlign = styleVariants({
  start: { textAlign: 'start' },
  center: { textAlign: 'center' },
  end: { textAlign: 'end' },
});
