import { theme } from '#/design/theme.css';
import { style, styleVariants } from '@vanilla-extract/css';

const base = style({});

export const person_pc_card_base = style({
  padding: '0.5rem',
  width: 320,
  height: 200,
  display: 'flex',
  // 임시
  border: '1px solid white',
});

export const SCREEN_VARIANT = styleVariants({
  pc: [
    base,
    {
      padding: '0.5rem',
      minWidth: 400,
      maxWidth: 600,
      height: 200,
      display: 'flex',
      // 임시
      // border: '1px solid white',
    },
  ],
  mobile: [
    base,
    {
      position: 'relative',
      // 마진 ok?
      margin: '0.5rem',
      borderRadius: '1.5rem',

      textAlign: 'center',
      width: '50%',
      aspectRatio: '2/3',
    },
  ],
});
