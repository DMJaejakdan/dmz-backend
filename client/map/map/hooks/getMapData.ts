import { MongoClient } from 'mongodb';

export async function getInitialGraph() {
  const client = await MongoClient.connect(
    'mongodb://root:ssafy.j9a602.dmz@j9a602.p.ssafy.io:27017'
  );
  const db = client.db('DMZ');
  const edgeCollection = db.collection('edge');
  const vertexCollection = db.collection('vertex');

  // 랜덤한 정점을 가져옵니다.
  const randomVertex = await vertexCollection
    .aggregate([{ $match: { type: 'content' } }, { $sample: { size: 1 } }])
    .next();

  // 해당 정점에서 뻗어나가는 모든 간선을 가져옵니다.
  const edges = await edgeCollection
    .find({
      $or: [{ from: randomVertex?.vertexId }, { to: randomVertex?.vertexId }],
    })
    .sort({ weight: -1 })
    .limit(15)
    .toArray();

  // 해당 간선에서 찾은 모든 'from'과 'to' 값들을 가져옵니다.
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

export async function addGraph(vertexId: number) {
  const client = await MongoClient.connect(
    'mongodb://root:ssafy.j9a602.dmz@j9a602.p.ssafy.io:27017'
  );
  const db = client.db('DMZ');
  const edgeCollection = db.collection('edge');
  const vertexCollection = db.collection('vertex');

  // 선택된 정점에서 뻗어나가는 모든 간선을 가져옵니다.
  const edges = await edgeCollection
    .find({ $or: [{ from: vertexId }, { to: vertexId }] })
    .toArray();

  // 해당 간선에서 찾은 모든 'from'과 'to' 값들을 가져옵니다.
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
