import Flex from '#/components/common/flex/Flex';
import Input from '#/components/common/input/Input';
import Spacing from '#/components/common/spacing/Spacing';
import Txt from '#/components/common/txt/Txt';
import { box_base } from '../SearchBox.css';
import Icon from '#/components/common/icon/Icon';

interface Props {
  title: string;
  placeholder?: string;
  value?: string;
  onFrom: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTo: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
function DateBox({
  title,
  placeholder = 'YYYYMM',
  value,
  onFrom,
  onTo,
}: Props) {
  return (
    <div className={box_base}>
      <Txt weight="bold" content={title} />
      <Spacing />
      <Flex direction="row" justify="spaceBetween" align="center">
        <Input placeholder={placeholder} value={value} onInput={onFrom} />
        <Spacing type="horizontal" />
        <Icon type="moreHoriz" color="white" />
        <Spacing type="horizontal" />
        <Input placeholder={placeholder} value={value} onInput={onTo} />
      </Flex>
    </div>
  );
}
export default DateBox;
