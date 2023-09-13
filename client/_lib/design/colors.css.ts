import {
  createGlobalTheme,
  createGlobalThemeContract,
  createTheme,
  globalFontFace,
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

const pt = 'pretendard';
globalFontFace(pt, {
  src: 'url(/fonts/Pretendard-Regular.subset.woff)',
});
export const font_rg = style({
  fontFamily: pt,
});

const ptb = 'pretendard Bold';
globalFontFace(ptb, {
  src: 'url(/fonts/Pretendard-Bold.subset.woff)',
});
export const font_bd = style({
  fontFamily: pt,
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
  },
  txt: {
    black: 'txt-black',
    white: 'txt-white',
    disabled: 'txt-disabled',
  },
  border: {
    placeholder: 'border-placeholder',
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
  },
  txt: {
    black: BLACK,
    white: WHITE,
    disabled: DARK_GREY,
  },
  border: {
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
// '--bg-d1': BLACK,
// '--bg-d2': BLACK_GREY,
// '--bg-d3': '#505057',
// '--bg-d4': '#65656C',
// '--bg-disabled': 'DDDDE2',
// '--bg-key': KEY,
// '--bg-key33': KEY,
// '--txt-black': BLACK,
// '--txt-white': WHITE,
// '--txt-disabled': DARK_GREY,
// '--border-placeholder': '1px solid #505057',
// '--border-transparent': '1px solid transparent',
// key': KEY,
// black': BLACK,
// blackgrey': BLACK_GREY,
// darkgrey': DARK_GREY,
// grey': GREY,
// lightgrey': LIGHT_GREY,
// whitegrey': WHITE_GREY,
// white': WHITE,
