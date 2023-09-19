'use client';
import { Icon } from '../icon/Icon';
import { TYPE_VARIANT } from './Chip.css';

interface Props {
  type: keyof typeof TYPE_VARIANT;
  label: string;
  onSelect?: (label: string) => void;
}

export function Chip({ type, label, onSelect }: Props) {
  switch (type) {
    case 'filter': //필터처럼 작동할 때에는 칩을 누르면 값이 상위 컴포넌트에 전달되어야 합니다. 따라서 onSelect에 setter를 전달하면 됩니다.
      return (
        <div
          className={TYPE_VARIANT[type]}
          onSelect={() => console.log(label)}
          onClick={() => onSelect && onSelect(label)}
        >
          <span>{label}</span>
        </div>
      );
    case 'input':
      return (
        <div className={TYPE_VARIANT[type]}>
          <span>{label}</span>
          <span>
            <Icon
              type="close"
              color="white"
              onClick={() => onSelect && onSelect(label)}
            />
          </span>
        </div>
      );
    default:
      return (
        <div className={TYPE_VARIANT[type]}>
          <span>{label}</span>
        </div>
      );
  }
}
