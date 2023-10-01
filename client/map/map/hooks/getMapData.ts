import { MongoClient } from 'mongodb';
export async function getGraphData(limit: number, skip: number = 0) {
  const client = await MongoClient.connect(
    'mongodb://root:ssafy.j9a602.dmz@j9a602.p.ssafy.io:27017',
    {
      connectTimeoutMS: 100000000,
      socketTimeoutMS: 100000000,
    }
  );
  const db = client.db('DMZ');
  const edgeCollection = db.collection('edge');
  const vertexCollection = db.collection('vertex');

  // 간선을 가져옵니다.
  const edges = await edgeCollection.find().limit(limit).skip(skip).toArray();

  // 간선에서 찾은 모든 'from'과 'to' 값들을 가져옵니다.
  const vertexIds = [...new Set(edges.flatMap(e => [e.from, e.to]))];

  // 해당 꼭짓점들을 가져옵니다.
  const vertices = await vertexCollection
    .find({ vertexId: { $in: vertexIds } })
    .toArray();

  client.close();

  return {
    vertices: JSON.parse(JSON.stringify(vertices)),
    edges: JSON.parse(JSON.stringify(edges)),
  };
}

export const getVerticesAndEdges = async (
  start: number,
  end: number
): Promise<{ vertices: Vertex[]; edges: Edge[] }> => {
  const client = await MongoClient.connect(
    'mongodb://root:ssafy.j9a602.dmz@j9a602.p.ssafy.io:27017',
    {
      connectTimeoutMS: 100000000,
      socketTimeoutMS: 100000000,
    }
  );

  const db = client.db('DMZ');

  // Vertices 데이터 가져오기
  const vertexCollection = db.collection('vertex');
  const verticesData = await vertexCollection
    .find({
      vertexId: {
        $gte: start,
        $lte: end,
      },
    })
    .toArray();

  const vertices = verticesData[0]
    ? JSON.parse(JSON.stringify(verticesData))
    : [];

  // 위에서 얻은 vertices의 vertexId를 사용하여 edges 데이터 가져오기
  const edgeCollection = db.collection('edge');
  const vertexIds = vertices.map((v: Vertex) => v.vertexId);

  const edgesData = await edgeCollection
    .find({
      from: { $in: vertexIds },
      type: 'content-content',
    })
    .sort({ weight: -1 })
    .limit(5 * vertexIds.length) // 각 vertexId당 3개의 edge를 가져옴
    .toArray();

  const edges = edgesData[0] ? JSON.parse(JSON.stringify(edgesData)) : [];

  client.close();

  return { vertices, edges };
};

// export const getVertices = async (
//   start: number,
//   end: number
// ): Promise<Vertex[]> => {
//   const client = await MongoClient.connect(
//     'mongodb://root:ssafy.j9a602.dmz@j9a602.p.ssafy.io:27017',
//     {
//       connectTimeoutMS: 100000000,
//       socketTimeoutMS: 100000000,
//     }
//   );
//   console.log('vertices 데이터 가져옴');
//   const db = client.db('DMZ');
//   const collection = db.collection('vertex');

//   const data = await collection
//     .find({
//       vertexId: {
//         $gte: start,
//         $lte: end,
//         //   // $in: [12, 3892, 2165, 11602, 4107, 8450],
//       },
//       // type: ,
//     })
//     .toArray(); // toArray를 사용하여 결과를 배열로 가져옴

//   client.close();

//   return data[0] ? JSON.parse(JSON.stringify(data)) : []; // 첫 번째 결과만 반환
// };

// export const getEdges = async (from: number): Promise<Edge[]> => {
//   const client = await MongoClient.connect(
//     'mongodb://root:ssafy.j9a602.dmz@j9a602.p.ssafy.io:27017'
//   );
//   console.log('edges 데이터 가져옴');
//   const db = client.db('DMZ');
//   const collection = db.collection('edge');

//   const data = await collection
//     .find({
//       from: from,
//       type: 'content-content',
//     })
//     .sort({ weight: -1 })
//     .limit(3)
//     .toArray(); // toArray를 사용하여 결과를 배열로 가져옴

//   client.close();

//   return data[0] ? JSON.parse(JSON.stringify(data)) : []; // 첫 번째 결과만 반환
// };

export interface Vertex {
  _id: string;
  imagePath: string;
  name: string;
  type: 'MOVIE' | 'DRAMA' | 'PERSON';
  vertexId: number;
}
export interface Edge {
  _id: string;
  edgeId: number;
  from: number;
  to: number;
  type: string;
  weight: number;
}
