import dynamic from 'next/dynamic';

const Button = dynamic(() => import('dmzlib/Button'), {
  loading: () => <p>loading...</p>,
  ssr: false,
});
const ARCHIVE_PAGE = dynamic(() => import('archive/ArchivePage'), {
  loading: () => <p>loading...</p>,
  ssr: false,
});

function Archive() {
  return (
    <>
      <ARCHIVE_PAGE />
      <Button />
    </>
  );
}

export default Archive;
