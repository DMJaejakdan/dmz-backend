import { spacingSize } from './Spacing.css';

interface spacingProps {
  unit?: '0.25' | '0.5' | '0.75' | '1' | '1.5' | '2' | '2.5' | '3';
}

export function Spacing({ unit = '1' }: spacingProps) {
  return (
    <div
      className={`${spacingSize[unit]}`}
      style={{
        // 숫자 받는 그대로 크기 커스텀 가능하도록 하려면 아래 코드 사용
        // height: `${unit}` + 'rem',

        // 아래 코드는 spacing 확인용 outline: 사용시 삭제
        outline: '1px solid red',
      }}
    ></div>
  );
}
