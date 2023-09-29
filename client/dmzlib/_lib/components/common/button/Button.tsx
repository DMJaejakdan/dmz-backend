'use client';

import { ButtonHTMLAttributes } from 'react';
import {
  COLOR_VARIANT,
  SHAPE_VARIANT,
  SIZE_VARIANT,
  STATUS_VARIANT,
  WIDTH_VARIANT,
} from './Button.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  btnType?: 'button' | 'submit' | 'reset';
  color: keyof typeof COLOR_VARIANT;
  status?: keyof typeof STATUS_VARIANT;
  size?: keyof typeof SIZE_VARIANT;
  shape?: keyof typeof SHAPE_VARIANT;
  width?: keyof typeof WIDTH_VARIANT;
}

function Button({
  label,
  color,
  btnType = 'button',
  status = 'normal',
  size = 'medium',
  shape = 'round',
  width = 'none',
  ...props
}: Props) {
  return (
    <button
      type={btnType}
      className={`
      ${COLOR_VARIANT[color]}
      ${STATUS_VARIANT[status]}
      ${SIZE_VARIANT[size]}
      ${SHAPE_VARIANT[shape]}
      ${WIDTH_VARIANT[width]}
      `}
      {...props}>
      {label}
    </button>
  );
}
export default Button;
