import { theme } from '@/_lib/design/colors.css';
import { style, styleVariants } from '@vanilla-extract/css';

const base = style({
  borderRadius: '2rem',
  width: 'fit-content',
  fontSize: '0.8rem',
  padding: '0.3rem 0.6rem 0.3rem 0.6rem',
  color: theme.colors.white,
  fontFamily: theme.font.bd,
});

export const container = styleVariants({
  filter: [base, { backgroundColor: 'black' }],
  input: [base, { backgroundColor: 'black' }],
  suggestion: [base, { backgroundColor: 'black' }],
});
