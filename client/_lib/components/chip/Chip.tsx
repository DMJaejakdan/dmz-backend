'use client';
import { container } from './Chip.css';

interface Props {
  type: keyof typeof container;
  label: string;
  onSelect?: () => void;
}

export function Chip({ type, label, onSelect }: Props) {
  switch (type) {
    case 'filter':
      return (
        <div className={container[type]} onSelect={() => console.log(label)}>
          <span>{label}</span>
        </div>
      );
    case 'input':
      return (
        <div className={container[type]}>
          <span>{label}</span>
          <span>X</span>
        </div>
      );
    default:
      return (
        <div className={container[type]}>
          <span>{label}</span>
        </div>
      );
  }
}
