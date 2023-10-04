import Icon from '#/components/common/icon/Icon';
import { DISABLED_VARIANT, chevron_base } from './PaginationChevron.css';

type ChevronProps =
  | 'chevronLeft'
  | 'chevronRight'
  | 'chevronUp'
  | 'chevronDown';

interface Props {
  direction: 'left' | 'right' | 'up' | 'down';
  disabled?: keyof typeof DISABLED_VARIANT;
  onClick?: () => void;
}

function PaginationChevron({ direction, disabled = 'false', ...props }: Props) {
  let chevronType: ChevronProps = 'chevronLeft';
  switch (direction) {
    case 'left':
      chevronType = 'chevronLeft';
      break;
    case 'right':
      chevronType = 'chevronRight';
      break;
    case 'up':
      chevronType = 'chevronUp';
      break;
    case 'down':
      chevronType = 'chevronDown';
      break;
    default:
  }
  return (
    <button className={DISABLED_VARIANT[disabled]} {...props}>
      {disabled === 'false' ? (
        <Icon type={chevronType} color="white" />
      ) : (
        <Icon type={chevronType} color="darkgrey" />
      )}
    </button>
  );
}
export default PaginationChevron;
