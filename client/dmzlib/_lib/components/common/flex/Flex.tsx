import { ReactNode } from 'react';
import { DIRECTION_VARIANT, JUSTIFY_VARIANT, ALIGN_VARIANT } from './Flex.css';

interface Props {
  direction: keyof typeof DIRECTION_VARIANT;
  justify: keyof typeof JUSTIFY_VARIANT;
  align: keyof typeof ALIGN_VARIANT;
  children: ReactNode;
}

function Flex({ direction, justify, align, children }: Props) {
  const flexAttributes = `${DIRECTION_VARIANT[direction]} ${JUSTIFY_VARIANT[justify]} ${ALIGN_VARIANT[align]}`;
  return <div className={flexAttributes}>{children}</div>;
}

export default Flex;
