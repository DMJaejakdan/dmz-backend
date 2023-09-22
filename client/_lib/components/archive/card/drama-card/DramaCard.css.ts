import { theme } from '#/design/theme.css';
import { style } from '@vanilla-extract/css';

export const drama_card = style({
  minWidth: 400,
  maxWidth: 600,
  display: 'flex',
  flexFlow: 'row',
});

export const img_base = style({
  borderRadius: '1.5rem',
  height: '100%',
  aspectRatio: '2/3',
  backgroundColor: theme.bg.disabled,
  textAlign: 'center',
});

export const default_img = style({});
