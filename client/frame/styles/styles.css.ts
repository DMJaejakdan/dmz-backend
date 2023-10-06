import { style } from '@vanilla-extract/css';

export const base = style({
  backgroundColor: '#101015',
  width: '100%',
  height: '100%',
  minWidth: '100vw',
  minHeight: '100vh',
});
export const container = style({
  display: 'flex',
  width: '100vw',
  height: '100vh',
});
export const item = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
});
