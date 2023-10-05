import dynamic from 'next/dynamic';
import { SHOW_VARIANT } from './MovieSearch.css';
import { useState } from 'react';
import moviesearch from '@/constants/moviesearch';

const Button = dynamic(() => import('dmzlib/Button'), { ssr: false });
const Title = dynamic(() => import('dmzlib/Title'), { ssr: false });
const Icon = dynamic(() => import('dmzlib/Icon'), { ssr: false });
const Spacing = dynamic(() => import('dmzlib/Spacing'), { ssr: false });
const Flex = dynamic(() => import('dmzlib/Flex'), { ssr: false });
const InputBox = dynamic(() => import('dmzlib/InputBox'), {
  ssr: false,
});
const KeywordBox = dynamic(() => import('dmzlib/KeywordBox'), {
  ssr: false,
});
const FilterBox = dynamic(() => import('dmzlib/FilterBox'), {
  ssr: false,
});
const DateBox = dynamic(() => import('dmzlib/DateBox'), { ssr: false });
async function onSearch() {
  'use server';
}

function MovieSearch() {
  const [display, setDisplay] = useState<'hide' | 'show'>('hide');
  return (
    <>
      <form action={onSearch}>
        <InputBox
          title={moviesearch.title.title}
          placeholder={moviesearch.placeholder.title}
          onInput={() => console.log('zz')}
          inputId="movieTitle"
          inputName="movieTitle"
        />
        <Spacing />
        <KeywordBox
          title={moviesearch.title.genre}
          onFind={() => null}
          onInput={() => null}
          inputId="movieGenre"
          inputName="movieGenre"
        />
        <Spacing />
        <KeywordBox
          title={moviesearch.title.person}
          onFind={() => null}
          onInput={() => null}
          inputId="moviePerson"
          inputName="moviePerson"
        />
        <Spacing />
        <KeywordBox
          title={moviesearch.title.keyword}
          onFind={() => null}
          onInput={() => null}
          inputId="movieKeyword"
          inputName="movieKeyword"
        />
        <Spacing />
        <InputBox
          title={moviesearch.title.story}
          placeholder={moviesearch.placeholder.story}
          onInput={() => console.log('zz')}
          inputId="movieStory"
          inputName="movieStory"
        />
        <Spacing />
        <Flex direction="row" justify="center" align="center">
          <Button
            btnType="submit"
            shape="round"
            size="small"
            color="black"
            label={
              display === 'show'
                ? moviesearch.button.less
                : moviesearch.button.more
            }
            onClick={() => setDisplay(display === 'show' ? 'hide' : 'show')}
          />
        </Flex>
        <Spacing unit="2" />
        <div className={SHOW_VARIANT[display]}>
          <Spacing />
          {/* //개봉시기 */}
          <DateBox
            title={moviesearch.title.time}
            inputId_f="movieDateF"
            inputName_f="movieDateF"
            inputId_t="movieDateT"
            inputName_t="movieDateT"
            onFrom={() => null}
            onTo={() => null}
          />
          <Spacing />
          {/* //제작투자배급사 */}
          <KeywordBox
            title={moviesearch.title.company}
            onFind={() => null}
            onInput={() => console.log('zz')}
            inputId="movieCompany"
            inputName="movieCompany"
          />
          <Spacing />
          {/* //스트리밍 제공 */}
          <KeywordBox
            title={moviesearch.title.ott}
            onFind={() => null}
            onInput={() => console.log('zz')}
            inputId="movieOtt"
            inputName="movieOtt"
          />
          <Spacing />
          {/* //시청등급 */}
          <FilterBox
            title={moviesearch.title.grade}
            options={[]}
            onInput={() => console.log('zz')}
            inputId="movieGrade"
            inputName="movieGrade"
          />
        </div>
        <Spacing />
        <Button
          shape="square"
          size="large"
          width="full"
          color="white"
          label="검색"
        />
        <Spacing />
      </form>
    </>
  );
}

MovieSearch.getInitialProps = async () => {
  const API = await fetch('https://swapi.dev/api/people/1').then(res =>
    res.json()
  );
  return API;
};

export default MovieSearch;
