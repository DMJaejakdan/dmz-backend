import theme from 'dmzlib/theme';
import { style } from '@vanilla-extract/css';

export const left_side = style({
  width: 'calc(100vw - 67vh - 6rem)',
  margin: '4rem',
});
export const right_side = style({});

export const img_container = style({
  position: 'fixed',
  right: 0,
  height: '100vh',
  aspectRatio: '2/3',

  backgroundColor: 'grey',
});

export const img = style({
  position: 'absolute',
  width: '100%',
  height: '100%',
});
export const grad = style({
  position: 'absolute',
  transform: 'translate(-1px, 0)',
  width: '34%',
  height: '100%',
  background: 'linear-gradient(to right, #101015, transparent)',
});
