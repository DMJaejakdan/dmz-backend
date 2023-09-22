// 임시로 오류가 발생하는 부분을 처리했습니다.
// line 6~7, 27~39 확인 및 수정 부탁드립니다.

import { MongoClient } from 'mongodb';

// 임시로 data 타입을 any로 지정했습니다. 향후 수정 바랍니다.
export default function Home(props: { data: any }) {
  return (
    <>
      <div>
        <MongoTest data={props.data} />
      </div>
    </>
  );
}

function MongoTest(props: { data: any }) {
  console.log('컴포넌트 마운트됨');
  console.log(props);
  return <>{JSON.stringify(props.data)}</>; // 데이터를 문자열로 변환하여 표시
}

export async function getServerSideProps() {
  const client = await MongoClient.connect(
    'mongodb://root:ssafy.j9a602.dmz@j9a602.p.ssafy.io:27017/DMZ',
    {
      // 임의로 주석처리하였습니다.
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    }
  );
  console.log('데이터 가져옴');
  const db = client.db();
  const collection = db.collection('vertex');

  const data = await collection
    .find({
      type: 'content',
    })
    .toArray(); // toArray를 사용하여 결과를 배열로 가져옴

  client.close();

  return {
    props: {
      data: data[0] ? JSON.parse(JSON.stringify(data[0])) : null, // 첫 번째 결과만 반환
    },
  };
}
