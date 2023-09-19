import { Button } from '#/components/common/button/Button';
import { Chip } from '#/components/common/chip/Chip';
import { Input } from '#/components/common/input/Input';
import { Title } from '#/components/common/title/Title';
import { searchbox } from '#/constants/searchbox';
import { TYPE_VARIANT, base } from './SearchCondition.css';

interface Props {
  type: 'text' | 'search' | 'filter';
  title: string;
  placeholder?: string;
  value?: string;
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options?: string[];
  onSelect?: () => void;
  onOverlay?: () => void;
}
export function SearchCondition({
  type,
  title,
  onInput = () => {},
  placeholder = 'placeholder',
  value = 'value',
  options = [],
  onSelect = () => {},
  onOverlay = () => {},
}: Props) {
  switch (type) {
    case 'text':
      return (
        <div className={base}>
          <Input placeholder={placeholder} value={value} onInput={onInput} />
        </div>
      );
    case 'search':
      return (
        <div className={base}>
          <div>
            <Title hn="h3" content={title} />
            <Button
              label={searchbox.searchcondition.button.search}
              onClick={onOverlay}
              color="grey"
            />
          </div>
          <div className={TYPE_VARIANT[type]}>
            {/* 오버레이 켜주고 거기서 인풋 연다음에 */}
          </div>
        </div>
      );
    case 'filter':
      return (
        <div className={base}>
          <div>
            <Title hn="h3" content={title} />
          </div>
          <div className={TYPE_VARIANT[type]}>
            {options.map((item, idx) => (
              <Chip key={idx} type="filter" label={item} onSelect={onSelect} />
            ))}
          </div>
        </div>
      );
  }
}
