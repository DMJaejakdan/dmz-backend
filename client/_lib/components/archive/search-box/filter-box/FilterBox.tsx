import { Chip } from '#/components/common/chip/Chip';
import { Spacing } from '#/components/common/spacing/Spacing';
import { Txt } from '#/components/common/txt/Txt';
import { box_base } from '../SearchBox.css';

interface Props {
  title: string;
  options: string[];
  onSelect: () => void;
}
export function FilterBox({ title, options, onSelect }: Props) {
  return (
    <div className={box_base}>
      <Txt weight="bold" content={title} />
      <Spacing unit={0.5} />
      <div>
        {options.map((item, idx) => (
          <Chip key={idx} type="filter" label={item} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}
