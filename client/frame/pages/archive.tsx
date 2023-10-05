import dynamic from 'next/dynamic';

const ARCHIVE_PAGE = dynamic(() => import('archive/ArchivePage'), {
  loading: () => <p>loading...</p>,
  ssr: false,
});

function Archive() {
  return (
    <>
      <ARCHIVE_PAGE />
    </>
  );
}

export default Archive;
