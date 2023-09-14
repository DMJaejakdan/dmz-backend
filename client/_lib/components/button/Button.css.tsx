import { style, styleVariants } from '@vanilla-extract/css';

/**
 * @author 박성준
 * @todo 각종 속성 글로벌 변수로 변경
 * @todo pressed(active) 상태 아직 안함
 */
const base = style({
  width: 'fit-content',
  fontWeight: 700,
  borderColor: 'transparent',
  ':hover': { cursor: 'pointer' },
});

export const buttonVariant = styleVariants({
  // todo
  primary: [base, { backgroundColor: 'white', color: 'black' }],
  secondary: [
    base,
    {
      backgroundColor: 'grey',
      color: 'white',
    },
  ],
  tertiary: [
    base,
    {
      backgroundColor: 'black',
      outlineColor: 'white',
      outlineWidth: 1.5,
      color: 'white',
    },
  ],
});

export const buttonStatus = styleVariants({
  normal: {},
  disabled: { color: 'lightgrey', ':hover': { cursor: 'default' } },
});

export const buttonSize = styleVariants({
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

export const buttonShape = styleVariants({
  round: { borderRadius: 100 },
  square: { borderRadius: '1rem' },
});

export const buttonFullWidth = styleVariants({
  none: {},
  full: { width: '100%' },
});
