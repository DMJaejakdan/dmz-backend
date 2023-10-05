import { HTMLAttributes } from 'react';
import { base } from './Input.css';

interface Props extends HTMLAttributes<HTMLInputElement> {
  placeholder: string;
  inputId?: string;
  inputName?: string;
  value?: string;
  onInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({
  placeholder,
  value,
  onInput,
  inputId,
  inputName,
  ...props
}: Props) {
  return (
    <input
      type="string"
      id={inputId}
      name={inputName}
      value={value}
      onChange={onInput}
      placeholder={placeholder}
      {...props}
      className={base}
    />
  );
}

export default Input;
