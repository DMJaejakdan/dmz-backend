import { theme } from '#/design/theme.css';
import { style } from '@vanilla-extract/css';

export const media_card_base = style({
  padding: '0.5rem',
  minWidth: 400,
  maxWidth: 600,
  height: 200,
  display: 'flex',
  // 임시
  border: '1px solid white',
});

export const text_container = style({
  width: '100%',
});

export const text_line = style({
  display: 'flex',
  flexWrap: 'wrap',
  height: 'fit-content',
});

export const img_container = style({
  position: 'relative',
  borderRadius: '1.5rem',
  height: '100%',
  aspectRatio: '2/3',
  backgroundColor: theme.bg.disabled,
  textAlign: 'center',
});

export const default_img = style({});
