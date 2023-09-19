import { globalFontFace, style } from '@vanilla-extract/css';
import { theme } from '../_lib/design/theme.css';

const ptb = 'pretendard Bold';
globalFontFace(ptb, {
  src: 'url(/fonts/Pretendard-Bold.subset.woff)',
  fontWeight: 700,
});

const font_bd = style({
  fontFamily: ptb,
  fontWeight: 700,
});

const pt = 'pretendard regular';
globalFontFace(pt, {
  src: 'url(/fonts/Pretendard-Regular.subset.woff)',
  fontWeight: 400,
});

const font_rg = style({
  fontFamily: pt,
  fontWeight: 400,
});

export const storybook = style({
  boxSizing: 'border-box',
  margin: 0,
  padding: '1rem',
  height: 'calc(100vh - 3rem)',
  fontFamily: pt,
  fontSize: '100%',
  backgroundColor: theme.bg.d2,
  color: 'inherit',
  textDecoration: 'none',
  listStyleType: 'none',
});
