import dynamic from 'next/dynamic';

const MAP_PAGE = dynamic(() => import('map/MapPage'), {
  loading: () => <p>loading...</p>,
  ssr: false,
});

function Map() {
  return (
    <>
      <MAP_PAGE />
    </>
  );
}

export default Map;
