import { HTMLAttributes } from 'react';
import { base } from './Input.css';

interface Props extends HTMLAttributes<HTMLInputElement> {
  placeholder: string;
  value?: string;
  onInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({ placeholder, value, onInput, ...props }: Props) {
  return (
    <input
      type="string"
      value={value}
      onChange={onInput}
      placeholder={placeholder}
      {...props}
      className={base}
    />
  );
}
