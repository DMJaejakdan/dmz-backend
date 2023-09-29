import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const Button = dynamic(() => import('dmzlib/Button'), { ssr: false });

const ArchivePage = () => (
  <div>
    <Head>
      <title>ARCHIVE</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <div className="hero">
      <h1>Shop Page</h1>
      <h3 className="title">This is a federated page owned by archive</h3>
    </div>
  </div>
);
//아래에서 ssr될 데이터를 가져와야 합니다
ArchivePage.getInitialProps = async () => {
  const API = await fetch('https://swapi.dev/api/people/1').then(res =>
    res.json()
  );
  return API;
};
export default ArchivePage;