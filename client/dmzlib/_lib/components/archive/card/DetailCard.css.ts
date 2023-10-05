import { style } from '@vanilla-extract/css';

export const card_container = style({
  display: 'flex',
  flexFlow: 'column',
  alignItems: 'center',
  width: 100,
  height: 'fit-content',
  cursor: 'pointer',
});
export const img_frame = style({
  position: 'relative',
  width: 100,
  height: 150,
});
export const txt_frame = style({
  position: 'relative',
  textAlign: 'center',
  width: 100,
  height: 60,
});
