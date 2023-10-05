// import { getGraphData } from '@/map/hooks/getMapData';
// import FDG from '@/map/tile/FDG';
// import { MongoClient } from 'mongodb';

// function Segment({ vertices, edges }: { vertices: any; edges: any }) {
//   return (
//     <>
//       <Graph vertices={vertices} edges={edges} />
//     </>
//   );
// }
// function Graph({ vertices, edges }: { vertices: any; edges: any }) {
//   console.log('데이터 그래프에 로드됨');
//   return (
//     <>
//       <FDG vertices={vertices} edges={edges} />
//     </>
//   );
// }
function Segment() {
  return <></>;
}
export default Segment;

// export async function getStaticPaths() {
//   const client = await MongoClient.connect(
//     'mongodb://root:ssafy.j9a602.dmz@j9a602.p.ssafy.io:27017'
//   );
//   const db = client.db('DMZ');
//   const edgeCollection = db.collection('edge');

//   // 전체 간선 수를 가져옵니다.
//   const totalEdges = await edgeCollection.countDocuments({
//     type: 'content-content',
//   });

//   // 페이지 수를 계산합니다. 여기서는 간선 200개마다 페이지를 분할합니다.
//   const pages = Math.ceil(JSON.parse(JSON.stringify(totalEdges)) / 1000);

//   const paths = Array.from({ length: pages }).map((_, i) => ({
//     params: { segment: `${i * 1000}-${(i + 1) * 1000 - 1}` },
//   }));

//   client.close();

//   return {
//     paths,
//     fallback: false,
//   };
// }

// export async function getStaticProps({ params }: any) {
//   const [start, end] = params.segment.split('-').map(Number);
//   console.log('데이터 가져옴...');
//   const skip = start;
//   const limit = end - start + 1;
//   const { vertices, edges } = await getGraphData(limit, skip);

//   return {
//     props: { vertices, edges },
//     revalidate: 86400,
//   };
// }
