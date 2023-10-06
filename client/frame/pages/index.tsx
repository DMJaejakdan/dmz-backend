import { container, item, item_black } from '@/styles/styles.css';
import dynamic from 'next/dynamic';
import Link from 'next/link';
const Title = dynamic(() => import('dmzlib/Title'), { ssr: false });
function Index() {
  return (
    <>
      <div className={container}>
        <div className={item}>
          <Link href="https://j9a602a.p.ssafy.io/dmzmap/Segment">
            <Title content="드라마영화지도" hn="h1" color="black" />
          </Link>
        </div>
        <div className={item_black}>
          <Link href="/archive">
            <Title content="드라마영화아카이브" hn="h1" color="white" />
          </Link>
        </div>
      </div>
    </>
  );
}

export default Index;
