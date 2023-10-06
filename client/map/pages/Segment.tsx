import { getInitialGraph } from '@/map/hooks/getMapData';
import FDG from '@/map/tile/FDG';

function Segment({ vertices, edges }: { vertices: any; edges: any }) {
  return (
    <>
      <Graph vertices={vertices} edges={edges} />
    </>
  );
}
function Graph({ vertices, edges }: { vertices: any; edges: any }) {
  console.log('데이터 그래프에 로드됨');
  return (
    <>
      <FDG vertices={vertices} edges={edges} />
    </>
  );
}
export async function getStaticProps() {
  const { vertices, edges } = await getInitialGraph();
  return { props: { vertices, edges }, revalidate: 300 };
}
export default Segment;
