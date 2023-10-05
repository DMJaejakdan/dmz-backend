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
  onFind: (keyword: string) => Promise<string[]> | null; //타입 수정해야합니다, 자동완성 ajax 요청 함수임
  onInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function KeywordBox({ title, onFind, onInput, inputId, inputName }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const [autocompleteKwds, setAutoCompleteKwds] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');

  const handleAutocomplete = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const pushSelected = (kwd: string) => setSelected([...selected, kwd]);
  const delSelected = (target: string) =>
    setSelected(selected.filter(kwd => kwd !== target));

  //자동완성 로직
  useEffect(() => {
    onFind(input)?.then(setAutoCompleteKwds);
  }, [onFind, input]);

  return (
    <div className={box_base}>
      <Txt weight="bold" content={title} />
      <Spacing />
      <div>
        {/* 선택된 애들을 배열에서 풀어 문자열로 바꿈, 이 부분은 ui적으로 보이지 않음  */}
        <input type="hidden" value={selected.join(',')} onChange={onInput} />
        <div className={selected_keywords}>
          {/* 선택된 애들이 chip으로 렌더링 되어야함 */}
          {selected.map((kwd, idx) => (
            <Chip key={idx} label={kwd} type="keyword" onDelete={delSelected} />
          ))}
        </div>
        <form
          onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            pushSelected(input);
          }}
        >
          <Input
            placeholder={searchbox.box.button.search}
            value={input}
            inputId={inputId}
            inputName={inputName}
            onInput={e => handleAutocomplete(e)}
          />
        </form>
        <div>
          {/* //키워드 리스트가 이 안에 들어감 */}
          <ul className={autocomplete_ul}>
            {autocompleteKwds.map((kwd, idx) => (
              <li className={autocomplete_li} key={idx}>
                {kwd}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default KeywordBox;
