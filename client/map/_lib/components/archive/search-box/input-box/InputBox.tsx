import { Input } from '#/components/common/input/Input';
import { Spacing } from '#/components/common/spacing/Spacing';
import { Txt } from '#/components/common/txt/Txt';

import { box_base } from '../SearchBox.css';

interface Props {
  title: string;
  placeholder: string;
  value?: string;
  onInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export function InputBox({ title, placeholder, value, onInput }: Props) {
  return (
    <div className={box_base}>
      <Txt weight="bold" content={title} />
      <Spacing />
      <Input placeholder={placeholder} value={value} onInput={onInput} />
    </div>
  );
}
