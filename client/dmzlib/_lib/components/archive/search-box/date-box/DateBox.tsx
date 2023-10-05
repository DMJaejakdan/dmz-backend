import Flex from '#/components/common/flex/Flex';
import Input from '#/components/common/input/Input';
import Spacing from '#/components/common/spacing/Spacing';
import Txt from '#/components/common/txt/Txt';
import { box_base } from '../SearchBox.css';
import Icon from '#/components/common/icon/Icon';

interface Props {
  title: string;
  placeholder?: string;
  value_f?: string;
  value_t?: string;
  inputId_f: string;
  inputName_f: string;
  inputId_t: string;
  inputName_t: string;
  onFrom: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTo: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
function DateBox({
  title,
  placeholder = 'YYYY-MM-DD',
  value_f,
  value_t,
  onFrom,
  onTo,
  inputId_f,
  inputName_f,
  inputId_t,
  inputName_t,
}: Props) {
  return (
    <div className={box_base}>
      <Txt weight="bold" content={title} />
      <Spacing />
      <Flex direction="row" justify="spaceBetween" align="center">
        <Input
          inputId={inputId_f}
          inputName={inputName_f}
          placeholder={placeholder}
          value={value_f}
          onInput={onFrom}
        />
        <Spacing type="horizontal" />
        <Icon type="moreHoriz" color="white" />
        <Spacing type="horizontal" />
        <Input
          inputId={inputId_t}
          inputName={inputName_t}
          placeholder={placeholder}
          value={value_t}
          onInput={onTo}
        />
      </Flex>
    </div>
  );
}
export default DateBox;
