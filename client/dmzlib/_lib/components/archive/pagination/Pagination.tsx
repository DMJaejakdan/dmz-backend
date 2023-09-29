'use client';

import { useState, useEffect } from 'react';
import Router from 'next/router';
import PaginationButton from './pagination-button/PaginationButton';
import PaginationChevron from './pagination-chevron/PaginationChevron';
import Txt from '#/components/common/txt/Txt';
import { pagination_container } from './Pagination.css';

interface Props {
  max: number;
  currPage: number;
  shownNums?: 3 | 5 | 7;
  onPageChange: (pageNum: number) => void;
  onPageMoveLeft: (pageNum: number) => void;
  onPageMoveRight: (pageNum: number) => void;
}

function Pagination({
  max,
  currPage,
  shownNums = 5,
  onPageChange,
  onPageMoveLeft,
  onPageMoveRight,
  ...props
}: Props) {
  if (max <= shownNums + 4) {
    let pageNumArr = Array.from({ length: max }, (_, index) => index + 1);
    return (
      <div className={pagination_container}>
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
    return (
      <>
        <Txt content="2" />
        <PaginationChevron direction="left" />;{}
        <PaginationChevron direction="right" />;
      </>
    );
  }
}
export default Pagination;
