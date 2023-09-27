import { memo } from 'react';
import { HORIZONTAL_VARIANT, VERTICAL_VARIANT } from './Spacing.css';

interface Props {
  type?: 'horizontal' | 'vertical';
  unit?: keyof typeof HORIZONTAL_VARIANT;
}

export const Spacing = memo(function Spacing({
  type = 'horizontal',
  unit = 1,
}: Props) {
  return (
    <div
      className={
        type === 'horizontal'
          ? `${HORIZONTAL_VARIANT[unit]}`
          : `${VERTICAL_VARIANT[unit]}`
      }
    ></div>
  );
});
