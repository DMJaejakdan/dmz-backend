import dynamic from 'next/dynamic';
import { SHOW_VARIANT } from './MSearch.css';
import { FormEvent, useState } from 'react';
import moviesearch from '@/constants/CONTENT_SEARCH';
import { AC } from '@/pages/api/_methods';
import { useRouter } from 'next/router';
import CONTENT_SEARCH from '@/constants/CONTENT_SEARCH';
const Button = dynamic(() => import('dmzlib/Button'), { ssr: false });
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

function MSearch() {
  const [display, setDisplay] = useState<'hide' | 'show'>('hide');
  const router = useRouter();
  async function searchMovie(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const queryString = new URLSearchParams(
      formData.entries() as any
    ).toString();
    const redirectUrl = `/contentResult?${queryString}`;
    // 리디렉션 실행
    router.push(redirectUrl);
  }
  return (
    <>
      <form onSubmit={searchMovie}>
        <InputBox
          title={moviesearch.title.title}
          placeholder={moviesearch.placeholder.title}
          onInput={() => {}}
          inputId="movieTitle"
          inputName="movieTitle"
        />
        <Spacing />
        <KeywordBox
          title={moviesearch.title.genre}
          onFind={input => AC('genre', input)}
          onInput={() => null}
          inputId="movieGenre"
          inputName="movieGenre"
        />
        <Spacing />
        <KeywordBox
          title={moviesearch.title.person}
          onFind={input => AC('person', input)}
          onInput={() => null}
          inputId="moviePerson"
          inputName="moviePerson"
        />
        <Spacing />
        <KeywordBox
          title={moviesearch.title.keyword}
          onFind={input => AC('keyword', input)}
          onInput={() => null}
          inputId="movieKeyword"
          inputName="movieKeyword"
        />
        <Spacing />
        <InputBox
          title={moviesearch.title.story}
          placeholder={moviesearch.placeholder.story}
          onInput={() => {}}
          inputId="movieStory"
          inputName="movieStory"
        />
        <Spacing />
        <Flex direction="row" justify="center" align="center">
          <Button
            shape="round"
            size="small"
            color="grey"
            label={
              display === 'show'
                ? moviesearch.button.less
                : moviesearch.button.more
            }
            onClick={() => setDisplay(display === 'show' ? 'hide' : 'show')}
          />
        </Flex>
        <Spacing />
        <div className={SHOW_VARIANT[display]}>
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
            onFind={input => AC('company', input)}
            onInput={() => {}}
            inputId="movieCompany"
            inputName="movieCompany"
          />
          <Spacing />
          {/* //스트리밍 제공 */}
          <KeywordBox
            title={moviesearch.title.ott}
            onFind={input => AC('ott', input)}
            onInput={() => {}}
            inputId="movieOtt"
            inputName="movieOtt"
          />
          <Spacing />
          {/* //시청등급 */}
          <FilterBox
            title={moviesearch.title.grade}
            options={['12', '15', '18', '전체 관람가']}
            onInput={() => {}}
            inputId="movieGrade"
            inputName="movieGrade"
          />
        </div>
        <Spacing />
        <Button
          btnType="submit"
          shape="square"
          size="large"
          width="full"
          color="white"
          label={CONTENT_SEARCH.button.search}
        />
        <Spacing />
      </form>
    </>
  );
}

MSearch.getInitialProps = async () => {
  const API = await fetch('https://swapi.dev/api/people/1').then(res =>
    res.json()
  );
  return API;
};

export default MSearch;
