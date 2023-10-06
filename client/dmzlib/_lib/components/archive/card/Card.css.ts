import theme from '#/design/theme.css';
import { style, styleVariants } from '@vanilla-extract/css';

const base = style({ cursor: 'pointer' });

export const SCREEN_VARIANT = styleVariants({
  pc: [
    base,
    {
      padding: '0.5rem',
      width: 500,
      height: 200,
      display: 'flex',
    },
  ],
  mobile: [
    base,
    {
      position: 'relative',
      margin: '0.5rem',
      borderRadius: '1.5rem',

      textAlign: 'center',
      width: '50%',
      aspectRatio: '2/3',
    },
  ],
});

export const pc_text_container = style({
  width: '100%',
});

export const mobile_text_container = style({
  padding: '1rem',
  zIndex: 1,
  position: 'absolute',
  bottom: 0,
});

export const text_line = style({
  display: 'flex',
  flexWrap: 'wrap',
});

export const pc_img_container = style({
  position: 'relative',
  borderRadius: '1.5rem',
  height: '100%',
  aspectRatio: '2/3',
  backgroundColor: theme.bg.disabled,
  textAlign: 'center',
});

export const mobile_img_container = style({
  position: 'absolute',
  filter: 'brightness(50%)',
  width: '100%',
  height: '100%',
  borderRadius: '1.5rem',
});

export const thumbnail_img = style({
  borderRadius: '1.5rem',
});

export const default_img = style({
  backgroundColor: theme.bg.disabled,
  width: '100%',
  height: '100%',
  borderRadius: '1.5rem',
});
