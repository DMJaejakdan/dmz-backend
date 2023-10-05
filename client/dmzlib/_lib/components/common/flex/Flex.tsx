import { ReactNode } from 'react';
import {
  DIRECTION_VARIANT,
  JUSTIFY_VARIANT,
  ALIGN_VARIANT,
  WRAP_VARIANT,
} from './Flex.css';

interface Props {
  direction?: keyof typeof DIRECTION_VARIANT;
  justify: keyof typeof JUSTIFY_VARIANT;
  align: keyof typeof ALIGN_VARIANT;
  wrap?: keyof typeof WRAP_VARIANT;
  children: ReactNode;
}

function Flex({
  direction = 'row',
  justify,
  align,
  wrap = 'wrap',
  children,
}: Props) {
  const flexAttributes = `${DIRECTION_VARIANT[direction]} ${JUSTIFY_VARIANT[justify]} ${ALIGN_VARIANT[align]} ${WRAP_VARIANT[wrap]}`;
  return <div className={flexAttributes}>{children}</div>;
}

export default Flex;
