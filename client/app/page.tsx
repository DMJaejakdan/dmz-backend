// 프론트 빌드를 위해 임시로 전체 코드를 주석처리합니다.

// import { MongoClient } from 'mongodb';

// export default function Home(props) {
//   return (
//     <>
//       <div>
//         <MongoTest data={props.data} />
//       </div>
//     </>
//   );
// }

// function MongoTest(props: { data: any }) {
//   console.log('컴포넌트 마운트됨');
//   console.log(props);
//   return <>{JSON.stringify(props.data)}</>; // 데이터를 문자열로 변환하여 표시
// }

// export async function getServerSideProps() {
//   const client = await MongoClient.connect(
//     'mongodb://root:ssafy.j9a602.dmz@j9a602.p.ssafy.io:27017/DMZ',
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
//   );
//   console.log('데이터 가져옴');
//   const db = client.db();
//   const collection = db.collection('vertex');

//   const data = await collection
//     .find({
//       type: 'content',
//     })
//     .toArray(); // toArray를 사용하여 결과를 배열로 가져옴

//   client.close();

//   return {
//     props: {
//       data: data[0] ? JSON.parse(JSON.stringify(data[0])) : null, // 첫 번째 결과만 반환
//     },
//   };
// }

// 해당 모듈은 삭제 바랍니다.
export default function Home() {
  return (
    <>
      <div>수정 바람</div>
    </>
  );
}
