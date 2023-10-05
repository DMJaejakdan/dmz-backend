import dynamic from 'next/dynamic';
import { SHOW_VARIANT } from './PSearch.css';
import { useState } from 'react';
import moviesearch from '@/constants/moviesearch';

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
async function onSearch() {
  'use server';
}

function MovieSearch() {
  const [display, setDisplay] = useState<'hide' | 'show'>('hide');
  return <></>;
}

MovieSearch.getInitialProps = async () => {
  const API = await fetch('https://swapi.dev/api/people/1').then(res =>
    res.json()
  );
  return API;
};

export default MovieSearch;
