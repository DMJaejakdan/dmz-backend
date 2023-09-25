import { Icon } from '../icon/Icon';
import { TYPE_VARIANT, SHAPE_VARIANT } from './Chip.css';

interface Props {
  type: keyof typeof TYPE_VARIANT;
  label: string;
  shape?: keyof typeof SHAPE_VARIANT;
  onSelect?: (label: string) => void;
  onDelete?: (kwd: string) => void;
}

export function Chip({
  type,
  label,
  shape = 'round',
  onSelect,
  onDelete,
}: Props) {
  const classname = `${TYPE_VARIANT[type]} ${SHAPE_VARIANT[shape]}`;
  switch (type) {
    case 'filter': //필터처럼 작동할 때에는 칩을 누르면 값이 상위 컴포넌트에 전달되어야 합니다. 따라서 onSelect에 setter를 전달하면 됩니다.
      return (
        <div
          className={classname}
          onSelect={() => console.log(label)}
          onClick={() => onSelect && onSelect(label)}
        >
          <span>{label}</span>
        </div>
      );
    case 'keyword':
      return (
        <div className={classname}>
          <span>{label}</span>
          <span>
            <Icon
              type="close"
              color="white"
              onClick={() => onDelete && onDelete(label)}
            />
          </span>
        </div>
      );
    case 'suggestion':
      return (
        <div className={classname}>
          <span>{label}</span>
        </div>
      );
  }
}
