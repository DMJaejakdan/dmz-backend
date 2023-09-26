import { theme } from '#/design/theme.css';
import { style } from '@vanilla-extract/css';

export const img_container = style({
  position: 'fixed',
  left: '100%',
  transform: 'translate(-100%, 0)',
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
  background: `linear-gradient(to right, ${theme.bg.d1}, transparent)`,
});
