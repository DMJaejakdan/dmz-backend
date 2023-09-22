import { theme } from '#/design/theme.css';
import { style, styleVariants } from '@vanilla-extract/css';

const base = style({
  borderRadius: '2rem',
  width: 'fit-content',
  height: '1.75rem',
  display: 'inline-flex',
  alignItems: 'center',
  fontSize: '0.8rem',
  lineHeight: 0,
  padding: '0 0.75rem 0 0.75rem',
  color: theme.colors.white,
  fontFamily: theme.font.rg,
  fontWeight: 400,
});

export const TYPE_VARIANT = styleVariants({
  filter: [
    base,
    { backgroundColor: theme.colors.white, color: theme.colors.black },
  ],
  filterselected: [base, { backgroundColor: theme.bg.key }],
  keyword: [
    base,
    {
      backgroundColor: theme.bg.d1,
      paddingRight: '0.4rem',
    },
  ],
  suggestion: [base, { backgroundColor: theme.bg.d1 }],
});
