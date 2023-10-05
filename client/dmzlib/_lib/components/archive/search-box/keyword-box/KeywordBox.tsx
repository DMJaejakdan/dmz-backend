import { FormEvent, useEffect, useState } from 'react';
import { box_base } from '../SearchBox.css';
import Chip from '#/components/common/chip/Chip';
import Input from '#/components/common/input/Input';
import searchbox from '#/constants/searchbox';
import Txt from '#/components/common/txt/Txt';
import Spacing from '#/components/common/spacing/Spacing';

import {
  autocomplete_li,
  autocomplete_ul,
  selected_keywords,
} from './KeywordBox.css';

interface Props {
  title: string;
  inputId: string;
  inputName: string;
  onFind: (input: string) => Promise<unknown[]> | null;
  onInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function KeywordBox({ title, onFind, onInput, inputId, inputName }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const [autocompleteKwds, setAutoCompleteKwds] = useState<unknown[]>([]);

  const [input, setInput] = useState<string>('');

  const pushSelected = (kwd: string) => setSelected([...selected, kwd]);
  const delSelected = (target: string) =>
    setSelected(selected.filter(kwd => kwd !== target));

  //자동완성 로직
  useEffect(() => {
    input !== '' && onFind(input)?.then(res => setAutoCompleteKwds(res));
  }, [onFind, input]);
  return (
    <div className={box_base}>
      <Txt weight="bold" content={title} />
      <Spacing />
      <div>
        {/* 선택된 애들을 배열에서 풀어 문자열로 바꿈, 이 부분은 ui적으로 보이지 않음  */}
        <input
          type="hidden"
          value={selected.join(',')}
          onChange={onInput}
          id={inputId}
          name={inputName}
        />
        <div className={selected_keywords}>
          {/* 선택된 애들이 chip으로 렌더링 되어야함 */}
          {selected.length &&
            selected.map((kwd, idx) => (
              <Chip
                key={idx}
                label={kwd}
                type="keyword"
                onDelete={delSelected}
              />
            ))}
        </div>

        <Input
          placeholder={searchbox.box.button.search}
          value={input}
          onInput={e => setInput(e.target.value)}
        />

        <Spacing />
        <div>
          {/* //키워드 리스트가 이 안에 들어감 */}
          <ul className={autocomplete_ul}>
            {autocompleteKwds.length > 0 &&
              autocompleteKwds.map((kwd: unknown, idx: number) => (
                <li className={autocomplete_li} key={idx}>
                  {JSON.stringify(kwd)}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default KeywordBox;
