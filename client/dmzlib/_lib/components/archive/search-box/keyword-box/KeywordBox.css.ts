import theme from '#/design/theme.css';
import { style } from '@vanilla-extract/css';

export const base = style({});

export const selected_keywords = style({});
export const autocomplete_ul = style({
  position: 'absolute',
  backgroundColor: theme.bg.d4,
  padding: '0.5rem',
  borderRadius: '0.8rem',
});

export const autocomplete_li = style({
  listStyleType: 'none',
  padding: '0.65rem',
  borderRadius: '0.75rem',
  color: theme.txt.white,
  ':hover': {
    backgroundColor: theme.bg.d2,
  },
});
