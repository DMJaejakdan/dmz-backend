import { AppProps } from 'next/app';
import { global } from '@/components/globalStyle.css';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Nav = dynamic(() => import('dmzlib/Nav'), { ssr: false });
function App({ Component, pageProps }: AppProps) {
  return (
    <div className={global}>
      <Link href={process.env.NEXT_PUBLIC_ROOT2 as string}>
        <Nav text="드라마영화지도로 가기" />
      </Link>
      <Component {...pageProps} />
    </div>
  );
}

export default App;
