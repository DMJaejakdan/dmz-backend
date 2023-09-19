import { memo } from 'react';
import { SIZE_VARIANT } from './Spacing.css';

interface Props {
  unit?: '0.25' | '0.5' | '0.75' | '1' | '1.5' | '2' | '2.5' | '3';
}

export const Spacing = memo(function Spacing({ unit = '1' }: Props) {
  return (
    <div
      className={`${SIZE_VARIANT[unit]}`}
      style={
        {
          // 숫자 받는 그대로 크기 커스텀 가능하도록 하려면 아래 코드 사용
          // height: `${unit}` + 'rem',
        }
      }
    ></div>
  );
});
