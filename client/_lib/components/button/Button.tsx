'use client';

import { ButtonHTMLAttributes } from 'react';
import {
  buttonVariant,
  buttonSize,
  buttonShape,
  buttonFullWidth,
  buttonStatus,
} from './Button.css';

/**
 * @author 박성준
 * @todo 흰 회 검 말고 임의색을 background로 하는 건 안함
 */

// 버튼 라벨, 테마, 타입, 크기, 라운드/스퀘어, 너비full
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  btnType?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'tertiary';
  status?: 'normal' | 'disabled';
  size?: 'large' | 'medium' | 'small';
  shape?: 'round' | 'square';
  fullWidth?: 'none' | 'full';
}

export function Button({
  label,
  variant = 'secondary',
  btnType = 'button',
  status = 'normal',
  size = 'medium',
  shape = 'round',
  fullWidth = 'none',
  ...props
}: ButtonProps) {
  return (
    <button
      type={btnType}
      className={`
      ${buttonVariant[variant]}
      ${buttonStatus[status]}
      ${buttonSize[size]}
      ${buttonShape[shape]}
      ${buttonFullWidth[fullWidth]}
      `}
      {...props}
    >
      {label}
    </button>
  );
}
