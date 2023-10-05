import React from 'react';
import Head from 'next/head';

import SearchTab from '@/components/SearchTab';
import dynamic from 'next/dynamic';

const Flex = dynamic(() => import('dmzlib/Flex'), { ssr: false });
const Title = dynamic(() => import('dmzlib/Title'), { ssr: false });
const Spacing = dynamic(() => import('dmzlib/Spacing'), { ssr: false });
function ArchivePage() {
  return (
    <div>
      <Head>
        <title>드라마영화지도 - 아카이브 검색</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex direction="column" justify="center" align="center">
        <Spacing unit={3} />
        <Title content="드라마영화지도 아카이브" hn="h2" />
        <Spacing unit={1} />
        <SearchTab />
      </Flex>
    </div>
  );
}

export default ArchivePage;
