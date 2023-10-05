import theme from '#/design/theme.css';
import { style } from '@vanilla-extract/css';

export const base = style({});

export const selected_keywords = style({});
export const autocomplete_ul = style({
  backgroundColor: theme.bg.d4,
  padding: '1rem',
  borderRadius: '1rem',
});

export const autocomplete_li = style({
  listStyleType: 'none',
  padding: '0.5rem',
  color: theme.txt.white,
});
