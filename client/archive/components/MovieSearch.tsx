import dynamic from 'next/dynamic';

const Button = dynamic(() => import('dmzlib/Button'), { ssr: false });

const InputForm = dynamic(() => import('dmzlib/InputBox'), {
  ssr: false,
});
async function MovieSearch() {}
export default MovieSearch;
