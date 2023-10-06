import { container, item } from '@/styles/styles.css';
import dynamic from 'next/dynamic';
import Link from 'next/link';
const Title = dynamic(() => import('dmzlib/Title'), { ssr: false });
function Index() {
  return (
    <>
      <div className={container}>
        <div className={item}>
          <Link href="/map">
            <Title content="지도" hn="h1" color="white" />
          </Link>
        </div>
        <div className={item}>
          <Link href="/archive">
            <Title content="아카이브 검색" hn="h1" color="white" />
          </Link>
        </div>
      </div>
    </>
  );
}

export default Index;
