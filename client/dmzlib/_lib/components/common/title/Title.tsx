import { HTMLAttributes } from 'react';
import {
  WEIGHT_VARIANT,
  ALIGN_VARIANT,
  SIZE_VARIANT,
  COLOR_VARIANT,
} from './Title.css';

interface Props extends HTMLAttributes<HTMLHeadingElement> {
  content: string;
  hn: keyof typeof SIZE_VARIANT;
  align?: keyof typeof ALIGN_VARIANT;
  color?: keyof typeof COLOR_VARIANT;
}

function Title({
  content,
  hn,
  align = 'start',
  color = 'white',
  ...props
}: Props) {
  const classname = `${SIZE_VARIANT[hn]} ${WEIGHT_VARIANT[hn]} ${ALIGN_VARIANT[align]} ${COLOR_VARIANT[color]}`;
  switch (hn) {
    case 'h1':
      return (
        <h1
          className={classname}
          {...props}>
          {content}
        </h1>
      );
    case 'h2':
      return (
        <h2
          className={classname}
          {...props}>
          {content}
        </h2>
      );
    case 'h3':
      return (
        <h3
          className={classname}
          {...props}>
          {content}
        </h3>
      );
    case 'h4':
      return (
        <h4
          className={classname}
          {...props}>
          {content}
        </h4>
      );
    case 'h5':
      return (
        <h5
          className={classname}
          {...props}>
          {content}
        </h5>
      );
    default:
      return <></>;
  }
}
export default Title;
