import { style } from '@vanilla-extract/css';

export const container = style({
  width: '100vw',
  height: '100vh',
  position: 'relative',
  overflow: 'hidden',
});

export const tile = style({
  position: 'absolute',
  width: '100px',
  height: '100px',
});
