import {
  SIZE_VARIANT,
  WEIGHT_VARIANT,
  ALIGN_VARIANT,
  COLOR_VARIANT,
} from './Txt.css';

interface Props {
  content: string;
  type?: 'span' | 'p';
  size?: keyof typeof SIZE_VARIANT;
  weight?: keyof typeof WEIGHT_VARIANT;
  align?: keyof typeof ALIGN_VARIANT;
  color?: keyof typeof COLOR_VARIANT;
}

export function Txt({
  content,
  type = 'span',
  size = 16,
  weight = 'regular',
  align = 'start',
  color = 'white',
  ...props
}: Props) {
  const classname = `${SIZE_VARIANT[size]} ${WEIGHT_VARIANT[weight]} ${ALIGN_VARIANT[align]} ${COLOR_VARIANT[color]}`;
  switch (type) {
    case 'span':
      return (
        <span className={classname} {...props}>
          {content}
        </span>
      );
    case 'p':
      return (
        <p className={classname} {...props}>
          {content}
        </p>
      );
    default:
      return <></>;
  }
}
