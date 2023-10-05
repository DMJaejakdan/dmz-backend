import theme from '#/design/theme.css';
import { style, styleVariants } from '@vanilla-extract/css';

export const tabs = style({});

export const tab_wrapper = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  maxWidth: '380px',
});

export const tab_content = style({
  paddingTop: '1rem',
});
export const base_tab = style({
  cursor: 'pointer',
  padding: '0.5rem 1rem 0.5rem 1rem',
  color: theme.txt.white,
  minWidth: 'calc(100% / 3)',
  textAlign: 'center',
});
export const TAB_ACTIVE_VARIANT = styleVariants({
  true: [
    base_tab,
    {
      borderBottom: theme.border.tab_active,
      transition: 'border-bottom 0.15s ease-in-out',
    },
  ],
  false: [
    base_tab,
    {
      borderBottom: theme.border.tab_inactive,
      transition: 'border-bottom 0.15s ease-in-out',
    },
  ],
});
