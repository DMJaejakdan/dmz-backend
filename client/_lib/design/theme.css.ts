import {
  createGlobalTheme,
  createGlobalThemeContract,
  globalFontFace,
  globalStyle,
  style,
} from '@vanilla-extract/css';

const KEY = '#518294';
const BLACK = '#101015';
const BLACK_GREY = '#27272C';
const DARK_GREY = '#AAAAAF';
const GREY = '#DDDDE2';
const LIGHT_GREY = '#EEEEF3';
const WHITE_GREY = '#F1F1F6';
const WHITE = '#FAFAFF';

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

export const theme = createGlobalThemeContract({
  bg: {
    d1: 'bg-d1',
    d2: 'bg-d2',
    d3: 'bg-d3',
    d4: 'bg-d4',
    disabled: 'bg-disabled',
    key: 'bg-key',
    key33: 'bg-key33',
    input: 'bd-input',
  },
  txt: {
    black: 'txt-black',
    white: 'txt-white',
    disabled: 'txt-disabled',
  },
  border: {
    black: 'border-black',
    white: 'border-white',
    input: 'border-input',
    placeholder: 'border-placeholder',
    tab_active: 'border-tab-active',
    tab_inactive: 'border-tab-inactive',
    transparent: 'border-transparent',
  },
  colors: {
    key: 'colors-key',
    black: 'colors-black',
    blackgrey: 'colors-blackgrey',
    darkgrey: 'colors-darkgrey',
    grey: 'colors-grey',
    lightgrey: 'colors-lightgrey',
    whitegrey: 'colors-whitegrey',
    white: 'colors-white',
  },
  font: {
    rg: 'font-rg',
    bd: 'font-bd',
  },
});

createGlobalTheme(':root', theme, {
  bg: {
    d1: BLACK,
    d2: BLACK_GREY,
    d3: '#505057',
    d4: '#65656C',
    disabled: '#DDDDE2',
    key: KEY,
    key33: KEY,
    input: '#505057',
  },
  txt: {
    black: BLACK,
    white: '#FFFFFF',
    disabled: DARK_GREY,
  },
  border: {
    black: `1px solid ${BLACK}`,
    white: `1px solid ${WHITE}`,
    tab_active: `2px solid ${KEY}`,
    tab_inactive: `2px solid ${WHITE}`,
    input: '1px solid transparent',
    placeholder: '1px solid #505057',
    transparent: '1px solid transparent',
  },
  colors: {
    key: KEY,
    black: BLACK,
    blackgrey: BLACK_GREY,
    darkgrey: DARK_GREY,
    grey: GREY,
    lightgrey: LIGHT_GREY,
    whitegrey: WHITE_GREY,
    white: WHITE,
  },
  font: {
    rg: pt,
    bd: ptb,
  },
});

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
