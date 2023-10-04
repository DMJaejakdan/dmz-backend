import dynamic from 'next/dynamic';
const Button = dynamic(() => import('dmzlib/Button'), { ssr: false });
const Icon = dynamic(() => import('dmzlib/Icon'), { ssr: false });
const Spacing = dynamic(() => import('dmzlib/Spacing'), { ssr: false });
const InputBox = dynamic(() => import('dmzlib/InputBox'), {
  ssr: false,
});
const KeywordBox = dynamic(() => import('dmzlib/KeywordBox'), {
  ssr: false,
});
const FilterBox = dynamic(() => import('dmzlib/FilterBox'), {
  ssr: false,
});

async function onSearch() {
  'use server';
}

function MovieSearch() {
  return (
    <>
      <form action={onSearch}>
        <InputBox
          title="ㅋㅋ"
          placeholder="입력해 당장"
          onInput={() => console.log('zz')}
        />
        <Spacing />
        <KeywordBox title="장르" onFind={() => null} />
        <Spacing />
        <KeywordBox title="출연진/스태프" onFind={() => null} />
        <Spacing />
        <KeywordBox title="키워드" onFind={() => null} />
        <Spacing />
        <InputBox
          title="줄거리/시놉시스"
          placeholder="입력해 당장"
          onInput={() => console.log('zz')}
        />
        <Spacing />
        <Button shape="square" width="full" color="white" label="검색" />
        <Button shape="round" size="small" color="black" label="조건 더보기" />
        <Spacing unit="2" />
        <Spacing />
        {/* //개봉시기 */}
        <InputBox
          title="개봉시기"
          placeholder="입력해 당장"
          onInput={() => console.log('zz')}
        />
        <Spacing />
        {/* //제작투자배급사 */}
        <KeywordBox title="제작/투자/배급사" onFind={() => null} />
        <Spacing />
        {/* //스트리밍 제공 */}
        <KeywordBox title="스트리밍 제공사" onFind={() => null} />
        <Spacing />
        {/* //시청등급 */}
        <FilterBox
          title="시청등급"
          options={[]}
          onSelect={() => console.log('ㅋㅋ')}
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
