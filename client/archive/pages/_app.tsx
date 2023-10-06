import { AppProps } from 'next/app';
import { global } from '@/components/globalStyle.css';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Nav = dynamic(() => import('dmzlib/Nav'), { ssr: false });
function App({ Component, pageProps }: AppProps) {
  return (
    <div className={global}>
      <Link href="https://j9a602a.p.ssafy.io/dmzmap/Segment">
        <Nav text="드라마영화지도로 가기" />
      </Link>
      <Component {...pageProps} />
    </div>
  );
}

export default App;
