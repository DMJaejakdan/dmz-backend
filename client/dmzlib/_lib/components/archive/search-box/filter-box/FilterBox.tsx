import Chip from '#/components/common/chip/Chip';
import Spacing from '#/components/common/spacing/Spacing';
import Txt from '#/components/common/txt/Txt';
import { box_base } from '../SearchBox.css';

interface Props {
  title: string;
  options: string[];
  onSelect: () => void;
}
function FilterBox({ title, options, onSelect }: Props) {
  return (
    <div className={box_base}>
      <Txt weight="bold" content={title} />
      <Spacing unit={0.5} />
      <div>
        {options.map((item, idx) => (
          <div key={idx}>
            <Chip type="filter" label={item} onSelect={onSelect} />
            <Spacing type="horizontal" unit={0.5} />
          </div>
        ))}
      </div>
    </div>
  );
}
export default FilterBox;
