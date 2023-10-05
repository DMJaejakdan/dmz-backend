import Chip from '#/components/common/chip/Chip';
import Spacing from '#/components/common/spacing/Spacing';
import Txt from '#/components/common/txt/Txt';
import { useState } from 'react';
import { box_base } from '../SearchBox.css';

interface Props {
  title: string;
  options: string[];
  inputId?: string;
  inputName?: string;
  onInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
function FilterBox({ title, options, onInput, inputId, inputName }: Props) {
  const [selected, setSelected] = useState<string[]>(['']);
  return (
    <div className={box_base}>
      <Txt weight="bold" content={title} />
      <Spacing unit={0.5} />
      <div>
        <input
          type="hidden"
          id={inputId}
          name={inputName}
          value={selected.join(',')}
          onChange={e => onInput(e)}
        />
        {options.map((item, idx) => (
          <div key={idx}>
            <Chip
              type="filter"
              label={item}
              onSelect={label => {
                selected.indexOf(label) > -1
                  ? setSelected(selected.filter(item => item !== label))
                  : setSelected([...selected, label]);
              }}
            />
            <Spacing type="horizontal" unit={0.5} />
          </div>
        ))}
      </div>
    </div>
  );
}
export default FilterBox;
