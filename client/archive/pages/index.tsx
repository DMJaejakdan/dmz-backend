import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import MovieSearch from '@/components/movieSearch/MSearch';

function ArchivePage() {
  return (
    <div>
      <Head>
        <title>드라마영화지도 - 아카이브 검색</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="hero">
        <MovieSearch />
      </div>
    </div>
  );
}

export default ArchivePage;
