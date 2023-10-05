import { styleVariants } from '@vanilla-extract/css';

export const SHOW_VARIANT = styleVariants({
  hide: { display: 'none' },
  show: { display: 'block' },
});
