import { style } from '@vanilla-extract/css';

export const card_container = style({
  display: 'flex',
  flexFlow: 'column',
  alignItems: 'center',
  width: 'fit-content',
  height: 'fit-content',
  cursor: 'pointer',
});
export const img_frame = style({
  position: 'relative',
  width: 100,
  height: 150,
});
