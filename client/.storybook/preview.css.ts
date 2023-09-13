import { globalStyle } from '@vanilla-extract/css';

globalStyle('*', {
  boxSizing: 'border-box',
}); //W3C 권고안을 따라 전역 선택자 사용
globalStyle('html, body', {
  margin: 0,
  padding: 0,
  fontSize: '100%',
});
globalStyle('h1, h2, h3, h4, h5, h6, p', {
  margin: 0,
  padding: 0,
  fontSize: '100%',
  fontWeight: 'normal',
});
globalStyle('a', {
  color: 'inherit',
  textDecoration: 'none',
});
globalStyle('ul, ol, li', {
  margin: 0,
  padding: 0,
  listStyleType: 'none',
});
