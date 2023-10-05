import { memo } from 'react';
import { HORIZONTAL_VARIANT, VERTICAL_VARIANT } from './Spacing.css';

interface Props {
  type?: 'horizontal' | 'vertical';
  unit?: keyof typeof HORIZONTAL_VARIANT;
}

const Spacing = memo(function Spacing({
  type = 'vertical',
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
export default Spacing;
