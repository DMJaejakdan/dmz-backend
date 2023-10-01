import dynamic from 'next/dynamic';
const MapPage = dynamic(() => import('map/Map'), {
  ssr: false,
});
function Map() {
  return (
    <>
      <h1>
        <MapPage />
      </h1>
    </>
  );
}

export default Map;
