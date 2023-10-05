function MapFrame() {
  //{ vertices, edges }: { vertices: any; edges: any }
  return (
    <>
      <div>
        지도입니다
        {/* <Tile vertices={vertices ? vertices : []} edges={edges} /> */}
      </div>
    </>
  );
}

// export async function getStaticProps() {
//   console.log('데이터 가져옴...');
//   const edges: Edge[] = [];
//   const vertices = await getVertices();
//   await vertices.map(v => getEdges(v.vertexId).then(res => edges.push(...res)));

//   return {
//     props: { vertices, edges },
//     revalidate: 86400,
//   };
// }
export default MapFrame;
