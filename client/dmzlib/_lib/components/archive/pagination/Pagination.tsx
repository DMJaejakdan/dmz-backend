'use client';

import Router from 'next/router';
import PaginationButton from './pagination-button/PaginationButton';
import PaginationChevron from './pagination-chevron/PaginationChevron';
import { pagination_container } from './Pagination.css';
import Icon from '#/components/common/icon/Icon';

interface Props {
  max: number;
  currPage: number;
  centerShownNums?: 3 | 5 | 7;
  onPageChange: (pageNum: number) => void;
  onPageMoveLeft: (pageNum: number) => void;
  onPageMoveRight: (pageNum: number) => void;
}

export function Pagination({
  max,
  currPage,
  centerShownNums = 5,
  onPageChange,
  onPageMoveLeft,
  onPageMoveRight,
  ...props
}: Props) {
  if (max <= centerShownNums + 4) {
    let pageNumArr = Array.from({ length: max }, (_, index) => index + 1);
    return (
      <div className={pagination_container} {...props}>
        <PaginationChevron
          direction="up"
          disabled={currPage === 1 ? 'true' : 'false'}
          onClick={() => onPageMoveLeft(currPage)}
        />
        {pageNumArr.map((pageNum, idx) => {
          return (
            <PaginationButton
              key={idx}
              btnNum={pageNum}
              active={currPage === pageNum ? 'true' : 'false'}
              onClick={() => onPageChange(pageNum)}
            />
          );
        })}
        <PaginationChevron
          direction="down"
          disabled={currPage === max ? 'true' : 'false'}
          onClick={() => onPageMoveRight(currPage)}
        />
      </div>
    );
  } else {
    let pageNumArr: (number | string)[] = [];

    if (currPage <= centerShownNums) {
      pageNumArr = [
        ...Array.from({ length: centerShownNums + 2 }, (_, index) => index + 1),
        '…',
        max,
      ];
    } else if (currPage >= max - centerShownNums + 1) {
      pageNumArr = [
        1,
        '…',
        ...Array.from(
          { length: centerShownNums + 2 },
          (_, index) => max - centerShownNums - 1 + index
        ),
      ];
    } else {
      pageNumArr = [
        1,
        '…',
        ...Array.from(
          { length: centerShownNums },
          (_, index) => currPage - Math.round(centerShownNums / 2) + 1 + index
        ),
        '…',
        max,
      ];
    }

    return (
      <div className={pagination_container} {...props}>
        <PaginationChevron
          direction="up"
          disabled={currPage === 1 ? 'true' : 'false'}
          onClick={() => onPageMoveLeft(currPage)}
        />
        {pageNumArr.map((pageNum, idx) => {
          if (pageNum === '…') {
            return <Icon key={idx} color="darkgrey" type="moreVert" />;
          }
          return (
            <PaginationButton
              key={idx}
              btnNum={pageNum as number}
              active={currPage === pageNum ? 'true' : 'false'}
              onClick={() => onPageChange(pageNum as number)}
            />
          );
        })}
        <PaginationChevron
          direction="down"
          disabled={currPage === max ? 'true' : 'false'}
          onClick={() => onPageMoveRight(currPage)}
        />
      </div>
    );
  }
}

export default Pagination;
