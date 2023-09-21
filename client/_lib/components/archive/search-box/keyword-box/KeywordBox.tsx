import { searchbox } from '#/constants/searchbox';
import { FormEvent, useState } from 'react';
import { box_base } from '../SearchBox.css';
import { Chip } from '#/components/common/chip/Chip';
import { Input } from '#/components/common/input/Input';
import {
  autocomplete_li,
  autocomplete_ul,
  selected_keywords,
} from './KeywordBox.css';
import { Txt } from '#/components/common/txt/Txt';
import { Spacing } from '#/components/common/spacing/Spacing';

interface Props {
  title: string;
  onFind: (keyword: string) => Promise<void> | null; //타입 수정해야합니다, 자동완성 ajax 요청 함수임
}

export function KeywordBox({ title, onFind }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const [autocompleteKwds, setAutoCompleteKwds] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');

  const handleAutocomplete = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    // const result = await onFind(inputValue)
    //   .then(res => res.json)
    //   .then(setAutoCompleteKeywords);
    //자동완성 로직인데 다른데다 구현을 해야함
  };
  const pushSelected = (kwd: string) => setSelected([...selected, kwd]);
  const delSelected = (target: string) =>
    setSelected(selected.filter(kwd => kwd !== target));

  return (
    <div className={box_base}>
      <Txt weight="bold" content={title} />
      <Spacing />
      <div>
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
            id={'keyword'}
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
