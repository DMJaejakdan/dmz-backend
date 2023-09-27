import { style, styleVariants } from '@vanilla-extract/css';

export const chevron_base = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: 0,
  width: '2rem',
  height: '2rem',
  borderRadius: 100,
  backgroundColor: 'transparent',
});

export const DISABLED_VARIANT = styleVariants({
  true: [chevron_base, {}],
  false: [chevron_base, { cursor: 'pointer' }],
});
