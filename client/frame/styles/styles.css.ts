import { globalFontFace, globalStyle, style } from '@vanilla-extract/css';

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
  backgroundColor: '#FAFAFF',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
});
export const item_black = style({
  backgroundColor: '#101015',
  color: '#FAFAFF',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
});

const ptb = 'pretendard Bold';
globalFontFace(ptb, {
  src: 'url(/dmzlib/fonts/Pretendard-Bold.subset.woff)',
  fontWeight: 700,
});

const font_bd = style({
  fontFamily: ptb,
  fontWeight: 700,
});

const pt = 'pretendard regular';
globalFontFace(pt, {
  src: 'url(/dmzlib/fonts/Pretendard-Regular.subset.woff)',
  fontWeight: 400,
});

const font_rg = style({
  fontFamily: pt,
  fontWeight: 400,
});
globalStyle('*', {
  boxSizing: 'border-box',
}); //W3C 권고안을 따라 전역 선택자 사용
globalStyle('html, body', {
  margin: 0,
  padding: 0,
  fontSize: '100%',
});
globalStyle('svg text', {
  fontFamily: pt,
});
