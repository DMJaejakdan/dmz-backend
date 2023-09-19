interface Props {
  type: 'text' | 'select' | 'filter';
  onInput: () => void;
}
export function SearchCondition({ type, onInput }: Props) {}
