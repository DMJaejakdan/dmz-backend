'use client';

import Txt from '#/components/common/txt/Txt';
import { HTMLAttributes } from 'react';
import { PAGE_ACTIVE_VARIANT } from './PaginationButton.css';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  btnNum: number;
  active?: keyof typeof PAGE_ACTIVE_VARIANT;
  onClick: () => void;
}

function PaginationButton({ btnNum, active = 'false', ...props }: Props) {
  return (
    <button className={PAGE_ACTIVE_VARIANT[active]} {...props}>
      {active === 'true' ? (
        <Txt
          content={btnNum.toString()}
          color="black"
          weight="bold"
          align="center"
        />
      ) : (
        <Txt content={btnNum.toString()} align="center" />
      )}
    </button>
  );
}
export default PaginationButton;
