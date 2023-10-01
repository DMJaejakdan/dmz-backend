import dynamic from 'next/dynamic';
import FDG from './FDG';
dynamic(() => import('dmzlib/theme'), { ssr: false });
function Tile({ vertices, edges }: { vertices: any; edges: any }) {
  return (
    <>
      <Graph vertices={vertices} edges={edges} />
    </>
  );
}
function Graph({ vertices, edges }: { vertices: any; edges: any }) {
  console.log('데이터 그래프에 로드됨', vertices, '\n', edges);
  return (
    <>
      <FDG vertices={vertices} edges={edges} />
    </>
  );
}

export default Tile;
